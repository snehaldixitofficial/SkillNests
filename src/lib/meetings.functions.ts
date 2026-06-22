import { createServerFn } from "@tanstack/react-start";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { createSign } from "crypto";
import { z } from "zod";

const FIREBASE_PROJECT_ID = "skillnests-3002c";
const ADMIN_EMAIL = "founders@skillnests.in";
const firebaseKeys = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  ),
);

export type MeetingSummary = {
  id: string;
  kind: "global" | "peer";
  title: string;
  hostName: string;
  hostEmail: string;
  startsAt: string;
  meetUrl: string;
  description?: string;
  createdAt: string;
};

type VerifiedUser = { uid: string; email: string; name: string; isAdmin: boolean };

const tokenInput = z.object({ idToken: z.string().min(20) });
const meetingInput = tokenInput.extend({
  kind: z.enum(["global", "peer"]),
  title: z.string().trim().min(1).max(120),
  startsAt: z
    .string()
    .refine((v) => !Number.isNaN(new Date(v).getTime()), "Invalid meeting time"),
  meetUrl: z.string().trim().min(1).max(500),
  description: z.string().trim().max(1000).optional(),
});

async function verifyUser(idToken: string): Promise<VerifiedUser> {
  const { payload } = await jwtVerify(idToken, firebaseKeys, {
    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
    audience: FIREBASE_PROJECT_ID,
  });
  const email = String(payload.email ?? "").toLowerCase();
  if (!email) throw new Error("Sign in again to continue.");
  const name =
    String(payload.name ?? "") || (email === ADMIN_EMAIL ? "Founders" : email.split("@")[0]);
  return { uid: String(payload.user_id ?? payload.sub), email, name, isAdmin: email === ADMIN_EMAIL };
}

// ---- Firestore REST helpers (no firebase-admin; works on Cloudflare Workers) ----

async function googleAccessToken(): Promise<string> {
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!svcJson) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not configured.");
  const sa = JSON.parse(svcJson) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned =
    b64({ alg: "RS256", typ: "JWT" }) +
    "." +
    b64({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/datastore",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    });
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const jwt = `${unsigned}.${signer.sign(sa.private_key).toString("base64url")}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  if (!res.ok) throw new Error(`token: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

const BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

type FsValue =
  | { stringValue: string }
  | { integerValue: string }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { nullValue: null };

type FsDoc = { name: string; fields?: Record<string, FsValue>; createTime?: string };

function toFields(obj: Record<string, string | number | boolean | null | Date | undefined>): Record<string, FsValue> {
  const out: Record<string, FsValue> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v === null) out[k] = { nullValue: null };
    else if (v instanceof Date) out[k] = { timestampValue: v.toISOString() };
    else if (typeof v === "string") out[k] = { stringValue: v };
    else if (typeof v === "number") out[k] = { integerValue: String(v) };
    else if (typeof v === "boolean") out[k] = { booleanValue: v };
  }
  return out;
}

function getStr(d: FsDoc, k: string): string {
  const v = d.fields?.[k];
  return v && "stringValue" in v ? v.stringValue : "";
}

function docToMeeting(d: FsDoc): MeetingSummary {
  const id = d.name.split("/").pop() || "";
  const kind = getStr(d, "kind") === "global" ? "global" : "peer";
  const description = getStr(d, "description");
  return {
    id,
    kind,
    title: getStr(d, "title"),
    hostName: getStr(d, "hostName"),
    hostEmail: getStr(d, "hostEmail"),
    startsAt: getStr(d, "startsAt"),
    meetUrl: getStr(d, "meetUrl"),
    description: description || undefined,
    createdAt: getStr(d, "createdAt") || d.createTime || "",
  };
}

// --------------------------------------------------------------------------

export const listMeetings = createServerFn({ method: "GET" })
  .inputValidator((data) => tokenInput.parse(data))
  .handler(async ({ data }) => {
    await verifyUser(data.idToken);
    const token = await googleAccessToken();
    const res = await fetch(`${BASE}:runQuery`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "meetings" }],
          orderBy: [{ field: { fieldPath: "startsAt" }, direction: "ASCENDING" }],
        },
      }),
    });
    if (!res.ok) throw new Error(`list: ${res.status} ${await res.text()}`);
    const arr = (await res.json()) as Array<{ document?: FsDoc }>;
    return arr.filter((r) => r.document).map((r) => docToMeeting(r.document!));
  });

export const createMeeting = createServerFn({ method: "POST" })
  .inputValidator((data) => meetingInput.parse(data))
  .handler(async ({ data }) => {
    const user = await verifyUser(data.idToken);
    if (data.kind === "global" && !user.isAdmin)
      throw new Error("Only the admin can host global meets.");
    const token = await googleAccessToken();
    const nowIso = new Date().toISOString();
    const startsAtIso = new Date(data.startsAt).toISOString();
    const fields = toFields({
      kind: data.kind,
      title: data.title,
      hostUid: user.uid,
      hostName: user.name,
      hostEmail: user.email,
      startsAt: startsAtIso,
      meetUrl: data.meetUrl,
      description: data.description || null,
      createdAt: nowIso,
    });
    const res = await fetch(`${BASE}/meetings`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) throw new Error(`create: ${res.status} ${await res.text()}`);
    return docToMeeting((await res.json()) as FsDoc);
  });

export const deleteMeeting = createServerFn({ method: "POST" })
  .inputValidator((data) => tokenInput.extend({ id: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const user = await verifyUser(data.idToken);
    const token = await googleAccessToken();
    // Read first to enforce ownership
    const getRes = await fetch(`${BASE}/meetings/${encodeURIComponent(data.id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (getRes.status === 404) throw new Error("Meeting not found.");
    if (!getRes.ok) throw new Error(`get: ${getRes.status} ${await getRes.text()}`);
    const doc = (await getRes.json()) as FsDoc;
    const meeting = docToMeeting(doc);
    if (!user.isAdmin && (meeting.kind !== "peer" || meeting.hostEmail !== user.email)) {
      throw new Error("You can only delete your own study rooms.");
    }
    const delRes = await fetch(`${BASE}/meetings/${encodeURIComponent(data.id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!delRes.ok) throw new Error(`delete: ${delRes.status} ${await delRes.text()}`);
    return { id: data.id };
  });
