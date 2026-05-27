import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingCart, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_NAME } from "@/lib/whatsapp";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/products" as const, label: "Shop" },
  { to: "/faq" as const, label: "FAQ" },
];

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground font-black shadow-glow">
            N
          </div>
          <span className="font-black tracking-tight text-lg md:text-xl">{BUSINESS_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/products"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted hover:text-primary"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted hover:text-primary"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
