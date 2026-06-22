import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual, createSign } from "crypto";

/**
 * Razorpay subscription webhook.
 *
 * Set in Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://skillnests.in/api/public/hooks/razorpay
 *   Events: subscription.activated, subscription.charged, subscription.cancelled, subscription.completed, subscription.halted, subscription.paused, subscription.resumed
 *   Secret: any strong string — paste the same value into RAZORPAY_WEBHOOK_SECRET
 *
 * Optional (for direct Firestore updates from this webhook):
 *   FIREBASE_SERVICE_ACCOUNT_JSON — JSON string of a Firebase service account.
 *   When absent, the webhook still verifies + acks events; client-side
 *   reconciliation on next login keeps `paidUntil` correct.
 */

const PROJECT_ID = "skillnests-3002c";

async function googleAccessToken(svcJson: string): Promise<string> {
  const sa = JSON.parse(svcJson) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64(header)}.${b64(claim)}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const sig = signer.sign(sa.private_key).toString("base64url");
  const jwt = `${unsigned}.${sig}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  if (!res.ok) throw new Error(`token: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

async function findUserBySubscriptionId(token: string, subscriptionId: string): Promise<string | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
  const body = {
    structuredQuery: {
      from: [{ collectionId: "users" }],
      where: { fieldFilter: { field: { fieldPath: "subscriptionId" }, op: "EQUAL", value: { stringValue: subscriptionId } } },
      limit: 1,
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`runQuery ${res.status}: ${await res.text()}`);
  const arr = (await res.json()) as Array<{ document?: { name: string } }>;
  const docName = arr.find((r) => r.document)?.document?.name;
  if (!docName) return null;
  return docName.split("/").pop() || null;
}

async function patchUser(token: string, uid: string, fields: Record<string, { stringValue?: string; integerValue?: string; booleanValue?: boolean; timestampValue?: string }>) {
  const updateMask = Object.keys(fields).map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join("&");
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${encodeURIComponent(uid)}?${updateMask}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`patch ${res.status}: ${await res.text()}`);
}

async function getUserDoc(token: string, uid: string): Promise<Record<string, any> | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${encodeURIComponent(uid)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`get ${res.status}: ${await res.text()}`);
  return (await res.json()) as Record<string, any>;
}

async function handleSubscriptionCharged(svcJson: string, subscriptionId: string, paymentId: string, paidAtSec: number) {
  const token = await googleAccessToken(svcJson);
  const uid = await findUserBySubscriptionId(token, subscriptionId);
  if (!uid) {
    console.warn("[razorpay-webhook] no user for subscription", subscriptionId);
    return;
  }
  const docu = await getUserDoc(token, uid);
  const fields = (docu?.fields || {}) as Record<string, any>;
  const lastPaidAt = fields.lastPaidAt?.integerValue ? Number(fields.lastPaidAt.integerValue) : 0;
  if (paidAtSec <= lastPaidAt) return; // idempotent
  const currentUntilStr: string | undefined = fields.paidUntil?.stringValue;
  const currentUntil = currentUntilStr ? new Date(currentUntilStr).getTime() : 0;
  const base = Math.max(currentUntil, Date.now());
  const until = new Date(base + 30 * 24 * 60 * 60 * 1000).toISOString();
  await patchUser(token, uid, {
    paid: { booleanValue: true },
    paidUntil: { stringValue: until },
    subscriptionId: { stringValue: subscriptionId },
    subscriptionStatus: { stringValue: "active" },
    lastInvoiceId: { stringValue: paymentId },
    lastPaidAt: { integerValue: String(paidAtSec) },
  });
  console.log("[razorpay-webhook] extended", uid, "until", until);
}

async function handleSubscriptionStatus(svcJson: string, subscriptionId: string, status: string) {
  const token = await googleAccessToken(svcJson);
  const uid = await findUserBySubscriptionId(token, subscriptionId);
  if (!uid) return;
  await patchUser(token, uid, { subscriptionStatus: { stringValue: status } });
}

export const Route = createFileRoute("/api/public/hooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) return new Response("Webhook secret not configured", { status: 503 });
        const signature = request.headers.get("x-razorpay-signature");
        const raw = await request.text();
        if (!signature) return new Response("missing signature", { status: 401 });
        const expected = createHmac("sha256", secret).update(raw).digest("hex");
        const a = Buffer.from(expected);
        const b = Buffer.from(signature);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("invalid signature", { status: 401 });
        }
        let payload: any;
        try { payload = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }
        const event: string = payload?.event || "";
        const sub = payload?.payload?.subscription?.entity;
        const pay = payload?.payload?.payment?.entity;
        const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

        try {
          if (!svcJson) {
            console.log("[razorpay-webhook] received", event, "(no FIREBASE_SERVICE_ACCOUNT_JSON — relying on client reconciliation)");
            return new Response("ok", { status: 200 });
          }
          if (event === "subscription.charged" && sub?.id && pay?.id) {
            const paidAt: number = typeof pay.created_at === "number" ? pay.created_at : Math.floor(Date.now() / 1000);
            await handleSubscriptionCharged(svcJson, sub.id, pay.id, paidAt);
          } else if (event && sub?.id) {
            const map: Record<string, string> = {
              "subscription.activated": "active",
              "subscription.cancelled": "cancelled",
              "subscription.completed": "completed",
              "subscription.halted": "halted",
              "subscription.paused": "paused",
              "subscription.resumed": "active",
            };
            const status = map[event];
            if (status) await handleSubscriptionStatus(svcJson, sub.id, status);
          }
        } catch (e: any) {
          console.error("[razorpay-webhook] handler error", e?.message || e);
          // Still ack to prevent Razorpay retry storm; client reconciliation will catch up.
        }
        return new Response("ok", { status: 200 });
      },
    },
  },
});
