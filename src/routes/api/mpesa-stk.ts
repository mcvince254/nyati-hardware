import { createFileRoute } from "@tanstack/react-router";

const env = () => (process.env.MPESA_ENV === "production" ? "production" : "sandbox");
const baseUrl = () =>
  env() === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

function normalizeMsisdn(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return "254" + digits.slice(1);
  if (digits.startsWith("7") && digits.length === 9) return "254" + digits;
  if (digits.startsWith("1") && digits.length === 9) return "254" + digits;
  return null;
}

function timestamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getFullYear().toString() +
    p(d.getMonth() + 1) +
    p(d.getDate()) +
    p(d.getHours()) +
    p(d.getMinutes()) +
    p(d.getSeconds())
  );
}

async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) throw new Error("MPESA_CONSUMER_KEY / MPESA_CONSUMER_SECRET not set");
  const creds = btoa(`${key}:${secret}`);
  const res = await fetch(`${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${creds}` },
  });
  if (!res.ok) throw new Error(`OAuth failed [${res.status}]: ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export const Route = createFileRoute("/api/mpesa-stk")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { phone?: string; amount?: number; reference?: string; description?: string };
          const msisdn = normalizeMsisdn(body.phone ?? "");
          const amount = Math.round(Number(body.amount));
          if (!msisdn) return Response.json({ error: "Invalid phone number" }, { status: 400 });
          if (!amount || amount < 1) return Response.json({ error: "Invalid amount" }, { status: 400 });

          const shortcode = process.env.MPESA_SHORTCODE;
          const passkey = process.env.MPESA_PASSKEY;
          if (!shortcode || !passkey) {
            return Response.json({ error: "M-Pesa not configured" }, { status: 500 });
          }

          const ts = timestamp();
          const password = btoa(`${shortcode}${passkey}${ts}`);
          const token = await getAccessToken();

          const origin = new URL(request.url).origin;
          const callbackUrl = process.env.MPESA_CALLBACK_URL || `${origin}/api/public/mpesa-callback`;

          const payload = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: ts,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: msisdn,
            PartyB: shortcode,
            PhoneNumber: msisdn,
            CallBackURL: callbackUrl,
            AccountReference: (body.reference || "NYATI").slice(0, 12),
            TransactionDesc: (body.description || "NYATI Hardware order").slice(0, 13),
          };

          const stkRes = await fetch(`${baseUrl()}/mpesa/stkpush/v1/processrequest`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const stkJson = await stkRes.json();
          if (!stkRes.ok) {
            console.error("STK push failed", stkRes.status, stkJson);
            return Response.json({ error: "STK push failed", details: stkJson }, { status: 502 });
          }
          return Response.json({
            success: true,
            merchantRequestId: stkJson.MerchantRequestID,
            checkoutRequestId: stkJson.CheckoutRequestID,
            customerMessage: stkJson.CustomerMessage,
          });
        } catch (err) {
          console.error("mpesa-stk error", err);
          return Response.json({ error: (err as Error).message }, { status: 500 });
        }
      },
    },
  },
});
