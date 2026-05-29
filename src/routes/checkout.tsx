import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, CheckCircle2, Smartphone, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_NAME, formatKES, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NYATI HARDWARE" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [mpesaMessage, setMpesaMessage] = useState<string>("");

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = `Hello ${BUSINESS_NAME}, I would like to place an order:\n\n` +
    `Name: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\n` +
    (form.notes ? `Notes: ${form.notes}\n` : "") +
    `\nItems:\n${items.map((i) => `• ${i.name} x${i.quantity} — ${formatKES(i.price * i.quantity)}`).join("\n")}\n\nTotal: ${formatKES(total)}`;

  if (submitted) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center md:px-6">
        <CheckCircle2 className="h-16 w-16 text-whatsapp" />
        <h1 className="mt-6 text-3xl font-black">Order Sent!</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          We've opened WhatsApp with your order details. Send the message to confirm with our team and we'll get back to you immediately.
        </p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center md:px-6">
        <h1 className="text-2xl font-black">Your cart is empty</h1>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          Browse Products
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(message), "_blank");
    clear();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto grid gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-3xl font-black md:text-4xl">Checkout</h1>
        <p className="mt-1 text-muted-foreground">Complete your details — we'll confirm via WhatsApp.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
          {[
            { k: "name", label: "Full Name", type: "text", required: true },
            { k: "phone", label: "Phone Number", type: "tel", required: true },
            { k: "address", label: "Delivery Address", type: "text", required: true },
          ].map((f) => (
            <label key={f.k} className="block">
              <span className="mb-1.5 block text-sm font-semibold">{f.label}</span>
              <input
                type={f.type}
                required={f.required}
                value={form[f.k as keyof typeof form]}
                onChange={handle(f.k as keyof typeof form)}
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Order Notes (optional)</span>
            <textarea
              rows={3}
              value={form.notes}
              onChange={handle("notes")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <button type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-bold text-whatsapp-foreground hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Confirm Order via WhatsApp
          </button>

          <div className="relative my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase text-muted-foreground">or pay now</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="rounded-xl border border-border bg-gradient-to-br from-[#0a8f3c]/5 to-[#0a8f3c]/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a8f3c] text-white">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Pay with M-Pesa</p>
                <p className="text-xs text-muted-foreground">You'll get an STK push on {form.phone || "your phone"} for {formatKES(total)}</p>
              </div>
            </div>
            <button
              type="button"
              disabled={!form.name || !form.phone || !form.address || mpesaStatus === "sending" || mpesaStatus === "sent"}
              onClick={async () => {
                setMpesaStatus("sending");
                setMpesaMessage("");
                try {
                  const res = await fetch("/api/mpesa-stk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      phone: form.phone,
                      amount: total,
                      reference: "NYATI",
                      description: "Hardware order",
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.success) {
                    setMpesaStatus("error");
                    setMpesaMessage(data?.error || "Failed to send STK push. Please try again.");
                    return;
                  }
                  setMpesaStatus("sent");
                  setMpesaMessage(data.customerMessage || "Check your phone to complete payment.");
                } catch (err) {
                  setMpesaStatus("error");
                  setMpesaMessage((err as Error).message);
                }
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#0a8f3c] px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mpesaStatus === "idle" && (<><Smartphone className="h-4 w-4" /> M-Pesa Pay via STK</>)}
              {mpesaStatus === "sending" && (<><Loader2 className="h-4 w-4 animate-spin" /> Sending STK push…</>)}
              {mpesaStatus === "sent" && (<><CheckCircle2 className="h-4 w-4" /> Check your phone to complete</>)}
              {mpesaStatus === "error" && (<><Smartphone className="h-4 w-4" /> Try again</>)}
            </button>
            {mpesaStatus === "sent" && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {mpesaMessage || "Enter your M-Pesa PIN on your phone to authorize the payment."}
              </p>
            )}
            {mpesaStatus === "error" && (
              <p className="mt-2 text-center text-xs text-destructive">{mpesaMessage}</p>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Powered by Safaricom Daraja STK Push. You'll authorize the payment on your phone.
          </p>
        </form>
      </div>

      <aside>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span className="truncate">{i.name} <span className="text-muted-foreground">× {i.quantity}</span></span>
                <span className="font-semibold">{formatKES(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t border-border" />
          <div className="flex justify-between text-lg font-black"><span>Total</span><span className="text-primary">{formatKES(total)}</span></div>
        </div>
      </aside>
    </div>
  );
}
