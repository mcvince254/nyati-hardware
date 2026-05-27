import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NYATI HARDWARE" },
      { name: "description", content: "Frequently asked questions about products, delivery and orders at NYATI HARDWARE." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  { q: "Where are you located?", a: "We are along Ndumberi / Githunguri Road, easily accessible from Kiambu town. Use the map in the footer for directions." },
  { q: "Do you offer delivery?", a: "Yes — we deliver across Kiambu County and surrounding areas. Delivery cost depends on location and order size. Talk to us on WhatsApp for a quote." },
  { q: "Can I order via WhatsApp?", a: "Absolutely. Use the floating WhatsApp button or click 'Order via WhatsApp' on any product page. We respond within minutes during business hours." },
  { q: "Do you offer bulk discounts?", a: "Yes — contractors and project buyers get special wholesale pricing. Send us your list on WhatsApp for a tailored quote." },
  { q: "What are your operating hours?", a: "Monday to Saturday: 7:00 AM – 7:00 PM. Sunday: 9:00 AM – 4:00 PM." },
  { q: "Do you accept M-Pesa?", a: "Yes, we accept M-Pesa, cash, and bank transfer. Online card payments are coming soon." },
  { q: "Are your products genuine?", a: "Every item we sell is sourced from verified suppliers and major brands. Quality is non-negotiable." },
];

function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <header className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-secondary">Support</p>
        <h1 className="mt-1 text-4xl font-black md:text-5xl">Frequently Asked Questions</h1>
      </header>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-card open:shadow-elegant">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {f.q}
              <span className="text-primary text-2xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
