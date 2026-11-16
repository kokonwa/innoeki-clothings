import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/data/mockData";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Consultation", href: "#consultation" },
  { label: "Brand Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200/80 bg-bone/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-cobalt font-serif text-sm font-semibold tracking-tight text-white">
            {BRAND.monogram}
          </span>
          <span className="font-serif text-lg tracking-tight text-ink">
            {BRAND.name}
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-stone-600 transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-cobalt after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenCart}
            aria-label="Open shopping bag"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-stone-200/70 active:scale-95"
          >
            <ShoppingBag size={20} strokeWidth={1.6} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cobalt px-1 text-[11px] font-semibold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href="#consultation"
            className="ml-1 hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-cobalt active:scale-[0.98] sm:inline-block"
          >
            Book Styling
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-stone-200/70 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-stone-200 bg-bone md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-stone-100 py-3 text-sm font-medium text-stone-700 last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-full bg-ink py-3 text-center text-sm font-medium text-white"
              >
                Book Styling
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
