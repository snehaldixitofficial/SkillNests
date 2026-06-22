import { createServerFn } from "@tanstack/react-start";
import { createHmac, timingSafeEqual } from "crypto";

const PRICE_PAISE = 4900; // ₹49
const PLAN_NAME = "skillnests-monthly-49";
const PLAN_PERIOD = "monthly" as const;
const PLAN_INTERVAL = 1;

function getCreds() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in project secrets.");
  }
  return { keyId, keySecret, auth: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64") };
}

async function rzp<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { auth } = getCreds();
  const res = await fetch(`https://api.razorpay.com${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: auth, ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Razorpay ${path} ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

/** Find or create the ₹49/month plan. */
async function ensurePlan(): Promise<string> {
  // List up to 100 plans and look for ours by notes.code
  const list = await rzp<{ items: Array<{ id: string; item: { name: string }; notes?: Record<string, string> }> }>(
    "/v1/plans?count=100",
    { method: "GET" },
  );
  const existing = list.items?.find((p) => p?.notes?.code === PLAN_NAME || p?.item?.name === PLAN_NAME);
  if (existing) return existing.id;
  const created = await rzp<{ id: string }>("/v1/plans", {
    method: "POST",
    body: JSON.stringify({
      period: PLAN_PERIOD,
      interval: PLAN_INTERVAL,
      item: { name: PLAN_NAME, amount: PRICE_PAISE, currency: "INR", description: "skillnests.in monthly membership" },
      notes: { code: PLAN_NAME },
    }),
  });
  return created.id;
}

export const createRazorpaySubscription = createServerFn({ method: "POST" })
  .inputValidator((data: { uid: string; email: string }) => data)
  .handler(async ({ data }) => {
    const { keyId } = getCreds();
    const planId = await ensurePlan();
    const sub = await rzp<{ id: string; status: string }>("/v1/subscriptions", {
      method: "POST",
      body: JSON.stringify({
        plan_id: planId,
        total_count: 120, // up to 10 years of monthly cycles; user can cancel anytime
        customer_notify: 1,
        notes: { uid: data.uid, email: data.email, product: "skillnests-monthly" },
      }),
    });
    return { subscriptionId: sub.id, keyId };
  });

export const verifyRazorpaySubscription = createServerFn({ method: "POST" })
  .inputValidator((data: { subscriptionId: string; paymentId: string; signature: string }) => data)
  .handler(async ({ data }) => {
    const { keySecret } = getCreds();
    // For subscriptions, signature = HMAC_SHA256(payment_id + "|" + subscription_id, secret)
    const expected = createHmac("sha256", keySecret)
      .update(`${data.paymentId}|${data.subscriptionId}`)
      .digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(data.signature);
    const ok = a.length === b.length && timingSafeEqual(a, b);
    if (!ok) throw new Error("Signature verification failed.");
    return { ok: true };
  });

export const cancelRazorpaySubscription = createServerFn({ method: "POST" })
  .inputValidator((data: { subscriptionId: string; atCycleEnd?: boolean }) => data)
  .handler(async ({ data }) => {
    const sub = await rzp<{ id: string; status: string; current_end?: number }>(
      `/v1/subscriptions/${encodeURIComponent(data.subscriptionId)}/cancel`,
      {
        method: "POST",
        body: JSON.stringify({ cancel_at_cycle_end: data.atCycleEnd ? 1 : 0 }),
      },
    );
    return { id: sub.id, status: sub.status, currentEnd: sub.current_end ?? null };
  });

/** Returns the latest paid invoice's payment_id and paid_at (epoch seconds), if any. */
export const getLatestPaidInvoice = createServerFn({ method: "POST" })
  .inputValidator((data: { subscriptionId: string }) => data)
  .handler(async ({ data }) => {
    const list = await rzp<{
      items: Array<{ id: string; payment_id: string | null; status: string; paid_at: number | null; billing_start: number | null; billing_end: number | null }>;
    }>(`/v1/invoices?subscription_id=${encodeURIComponent(data.subscriptionId)}&count=20`, { method: "GET" });
    const paid = (list.items || []).filter((i) => i.status === "paid" && i.paid_at);
    paid.sort((a, b) => (b.paid_at || 0) - (a.paid_at || 0));
    const latest = paid[0];
    if (!latest) return { paymentId: null as string | null, paidAt: null as number | null, billingEnd: null as number | null };
    return { paymentId: latest.payment_id, paidAt: latest.paid_at, billingEnd: latest.billing_end };
  });

/** Returns subscription status from Razorpay so client can sync state. */
export const getSubscriptionStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { subscriptionId: string }) => data)
  .handler(async ({ data }) => {
    const sub = await rzp<{ id: string; status: string; current_end: number | null; charge_at: number | null; ended_at: number | null }>(
      `/v1/subscriptions/${encodeURIComponent(data.subscriptionId)}`,
      { method: "GET" },
    );
    return { id: sub.id, status: sub.status, currentEnd: sub.current_end, chargeAt: sub.charge_at, endedAt: sub.ended_at };
  });
