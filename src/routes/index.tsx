import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, MapPin, Phone, Clock, ShieldCheck, Truck, Tag, Users, Headphones, Package, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { BUSINESS_NAME, HOURS, LOCATION, PHONE_DISPLAY, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NYATI HARDWARE — Building, Fittings & Fabrication" },
      { name: "description", content: "Everything for Building, Fittings & Fabrication in One Place. Affordable, quality hardware at Ndumberi / Githunguri Road." },
      { property: "og:title", content: "NYATI HARDWARE" },
      { property: "og:description", content: "Everything for Building, Fittings & Fabrication in One Place." },
      { property: "og:image", content: "/hero-og.jpg" },
    ],
  }),
  component: Index,
});

const reasons = [
  { icon: Tag, title: "Affordable Prices", desc: "Wholesale pricing on every item, every day." },
  { icon: ShieldCheck, title: "Genuine Products", desc: "Only verified, quality-tested brands." },
  { icon: Headphones, title: "Fast Support", desc: "Friendly help via WhatsApp & phone." },
  { icon: Package, title: "Bulk Orders", desc: "Special pricing for contractors & sites." },
  { icon: Truck, title: "Delivery Options", desc: "Reliable delivery across Kiambu County." },
  { icon: Users, title: "Experienced Staff", desc: "Expert advice you can trust." },
];

const testimonials = [
  { name: "James M.", role: "Contractor, Kiambu", text: "Best prices in the area and they always have what I need. Delivery to my site is always on time." },
  { name: "Sarah W.", role: "Homeowner", text: "Helpful staff who guided me through every paint and fitting decision. My renovation went smoothly." },
  { name: "Peter K.", role: "Fundi", text: "I get all my welding rods and tools here. Quality is genuine and prices are unbeatable." },
];

function Index() {
  const featured = products.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Hardware warehouse" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/70 to-primary/80" />
        </div>
        <div className="container mx-auto px-4 py-20 md:px-6 md:py-32 lg:py-40">
          <div className="max-w-3xl text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/20 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-whatsapp animate-pulse" /> Open Now · {HOURS.split("·")[0].trim()}
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
              {BUSINESS_NAME}
            </h1>
            <p className="mt-4 text-xl font-semibold text-primary-foreground/90 md:text-2xl">
              Everything for Building, Fittings & Fabrication in One Place.
            </p>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/80 md:text-lg">
              Affordable wholesale prices, genuine quality products, and a wide range of construction
              materials — backed by trusted service and a convenient location at Ndumberi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-elegant transition-transform hover:scale-105"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink(`Hello ${BUSINESS_NAME}, I would like to make an inquiry.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-bold text-whatsapp-foreground hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: MapPin, label: LOCATION },
                { icon: Phone, label: PHONE_DISPLAY },
                { icon: Clock, label: "Mon-Sat 7AM - 7PM" },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-medium ring-1 ring-white/15 backdrop-blur">
                  <it.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">Browse</p>
            <h2 className="mt-1 text-3xl font-black md:text-4xl">Featured Categories</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/products"
              search={{ category: c.name }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="text-4xl">{c.icon}</div>
              <h3 className="mt-3 text-sm font-bold">{c.name}</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">Why Us</p>
            <h2 className="mt-1 text-3xl font-black md:text-4xl">Trusted by Builders Across Kiambu</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">Bestsellers</p>
            <h2 className="mt-1 text-3xl font-black md:text-4xl">Featured Products</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">Reviews</p>
            <h2 className="mt-1 text-3xl font-black md:text-4xl">What Our Customers Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-card p-6 shadow-card">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.text}"</blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY CTA */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16">
          <div className="relative z-10 grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">Need Delivery to Your Site?</h2>
              <p className="mt-3 text-primary-foreground/90">
                We deliver building materials, cement, sand, and tools across Kiambu County. Talk to us on WhatsApp for a fast quote.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={whatsappLink(`Hello ${BUSINESS_NAME}, I would like a delivery quote.`)}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary hover:scale-105 transition-transform"
              >
                <MessageCircle className="h-4 w-4" /> Get a Quote
              </a>
              <a href={`tel:${PHONE_DISPLAY}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold ring-1 ring-white/30 hover:bg-white/20">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
      </section>
    </>
  );
}
