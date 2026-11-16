import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import ConsultationBooking from "@/components/ConsultationBooking";
import BrandProfileAndContact from "@/components/BrandProfileAndContact";
import CartAndCheckoutModal from "@/components/CartAndCheckoutModal";
import type { CartItem, Product } from "@/data/mockData";

const CART_KEY = "maren_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]).filter((item) => item.product.id !== "overcoat") : [];
  } catch {
    return [];
  }
}

const keyOf = (i: CartItem) => `${i.product.id}|${i.size}|${i.color}`;

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart]);

  const addToCart = (product: Product, size: string, color: string, qty: number) => {
    setCart((prev) => {
      const key = `${product.id}|${size}|${color}`;
      const existing = prev.find((i) => keyOf(i) === key);
      if (existing) {
        return prev.map((i) => (keyOf(i) === key ? { ...i, quantity: Math.min(9, i.quantity + qty) } : i));
      }
      return [...prev, { product, size, color, quantity: qty }];
    });
    toast.success(`${product.name} added to bag`, {
      action: { label: "View bag", onClick: () => setCartOpen(true) },
    });
  };

  const updateQty = (item: CartItem, qty: number) => {
    if (qty <= 0) {
      removeItem(item);
      return;
    }
    setCart((prev) => prev.map((i) => (keyOf(i) === keyOf(item) ? { ...i, quantity: Math.min(9, qty) } : i)));
  };

  const removeItem = (item: CartItem) => {
    setCart((prev) => prev.filter((i) => keyOf(i) !== keyOf(item)));
    toast.info(`${item.product.name} removed`);
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-bone font-sans text-ink antialiased">
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <ProductCatalog onAddToCart={addToCart} />
        <ConsultationBooking />
        <BrandProfileAndContact />
      </main>
      <CartAndCheckoutModal
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQuantityChange={updateQty}
        onRemove={removeItem}
        onCheckoutComplete={() => setCart([])}
      />
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
