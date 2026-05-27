import { ShoppingCart, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { BUSINESS_NAME, formatKES, whatsappLink } from "@/lib/whatsapp";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground ${product.badge === "New" ? "bg-secondary" : "bg-primary"}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-secondary">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 text-base font-bold">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-lg font-black text-primary">{formatKES(product.price)}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => { add(product); toast.success(`${product.name} added to cart`); }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </button>
          <a
            href={whatsappLink(`Hello ${BUSINESS_NAME}, I would like to inquire about: ${product.name} (${formatKES(product.price)})`)}
            target="_blank"
            rel="noreferrer"
            aria-label="Ask on WhatsApp"
            className="inline-flex items-center justify-center rounded-full bg-whatsapp px-3 py-2 text-xs font-semibold text-whatsapp-foreground hover:opacity-90"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
