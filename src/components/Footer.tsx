import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Clock, Mail } from "lucide-react";
import { BUSINESS_NAME, HOURS, LOCATION, PHONE_DISPLAY, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-purple text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:px-6 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-black">{BUSINESS_NAME}</h3>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Your one-stop shop for building, fittings, and fabrication materials in Kiambu County.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> {LOCATION}</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5" /> {PHONE_DISPLAY}</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5" /> {HOURS}</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5" /><span>info@nyatihardware.co.ke</span></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Find Us</h4>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/20">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Githunguri,+Kiambu,+Kenya&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <a
            href={whatsappLink(`Hello ${BUSINESS_NAME}, I would like to inquire about your products.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground hover:opacity-90"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="container mx-auto px-4 py-5 text-center text-xs text-primary-foreground/70 md:px-6">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
