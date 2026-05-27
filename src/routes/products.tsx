import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search } from "lucide-react";
import { categories, products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const categoryNames = categories.map((c) => c.name) as [Category, ...Category[]];
const schema = z.object({
  category: fallback(z.enum(["All", ...categoryNames]), "All").default("All"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Shop — NYATI HARDWARE" },
      { name: "description", content: "Browse building materials, paints, plumbing, tools and more at NYATI HARDWARE." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (needle && !`${p.name} ${p.description}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [category, query]);

  const chips: ("All" | Category)[] = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <header className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wider text-secondary">Catalog</p>
        <h1 className="mt-1 text-3xl font-black md:text-5xl">Shop Hardware & Materials</h1>
        <p className="mt-2 text-muted-foreground">Browse our full range of construction and fabrication products.</p>
      </header>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              navigate({ search: (prev: z.infer<typeof schema>) => ({ ...prev, q: v }), replace: true });
            }}
            placeholder="Search products..."
            className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="mb-8 -mx-4 overflow-x-auto px-4">
        <div className="flex gap-2 pb-2">
          {chips.map((c) => {
            const active = c === category;
            return (
              <Link
                key={c}
                to="/products"
                search={(prev: z.infer<typeof schema>) => ({ ...prev, category: c })}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-card"
                    : "bg-muted text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <p className="text-lg font-semibold">No products found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
