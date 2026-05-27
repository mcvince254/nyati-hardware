import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_NAME, formatKES, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — NYATI HARDWARE" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, update, remove, total } = useCart();

  const waMessage = `Hello ${BUSINESS_NAME}, I would like to place this order:\n\n${items
    .map((i) => `• ${i.name} x${i.quantity} — ${formatKES(i.price * i.quantity)}`)
    .join("\n")}\n\nTotal: ${formatKES(total)}`;

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center md:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-black">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start shopping to add items to your cart.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-3xl font-black md:text-4xl">Your Cart</h1>
        <p className="mt-1 text-muted-foreground">{items.length} item(s)</p>

        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
          {items.map((i) => (
            <li key={i.id} className="flex gap-4 p-4">
              <img src={i.image} alt={i.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-secondary">{i.category}</p>
                    <h3 className="truncate font-bold">{i.name}</h3>
                  </div>
                  <button onClick={() => remove(i.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button onClick={() => update(i.id, i.quantity - 1)} className="px-3 py-1.5 hover:bg-muted rounded-l-full" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{i.quantity}</span>
                    <button onClick={() => update(i.id, i.quantity + 1)} className="px-3 py-1.5 hover:bg-muted rounded-r-full" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <p className="font-black text-primary">{formatKES(i.price * i.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{formatKES(total)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="font-semibold">Calculated at checkout</dd></div>
          </dl>
          <div className="my-4 border-t border-border" />
          <div className="flex justify-between text-lg font-black"><span>Total</span><span className="text-primary">{formatKES(total)}</span></div>
          <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-full bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-card hover:opacity-90">
            Proceed to Checkout
          </Link>
          <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-bold text-whatsapp-foreground hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Order via WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}
