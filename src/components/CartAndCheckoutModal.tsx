import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Check,
  CreditCard,
  Truck,
} from "lucide-react";
import type { CartItem } from "@/data/mockData";

const FREE_SHIP = 250;
const TAX_RATE = 0.085;
const FLAT_SHIP = 15;

const PROMOS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  INNOEKI10: { type: "percent", value: 10, label: "10% off" },
  WELCOME20: { type: "flat", value: 20, label: "$20 off" },
};

const fmt = (n: number) => `$${n.toFixed(2)}`;
const keyOf = (i: CartItem) => `${i.product.id}|${i.size}|${i.color}`;

interface Props {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onQuantityChange: (item: CartItem, qty: number) => void;
  onRemove: (item: CartItem) => void;
  onCheckoutComplete: () => void;
}

export default function CartAndCheckoutModal({
  items,
  open,
  onClose,
  onQuantityChange,
  onRemove,
  onCheckoutComplete,
}: Props) {
  const [view, setView] = useState<"bag" | "checkout" | "done">("bag");
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<null | { type: "percent" | "flat"; value: number; label: string }>(null);
  const [order, setOrder] = useState("");
  const [buyer, setBuyer] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "" });

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
    let discount = 0;
    if (promo) discount = promo.type === "percent" ? (subtotal * promo.value) / 100 : Math.min(promo.value, subtotal);
    const net = Math.max(0, subtotal - discount);
    const shipping = net === 0 || net >= FREE_SHIP ? 0 : FLAT_SHIP;
    const tax = net * TAX_RATE;
    return { subtotal, discount, shipping, tax, total: net + shipping + tax };
  }, [items, promo]);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMOS[code]) {
      setPromo(PROMOS[code]);
      toast.success(`Promo applied — ${PROMOS[code].label}`);
    } else {
      setPromo(null);
      toast.error("That code is not valid.");
    }
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyer.name || !/.+@.+\..+/.test(buyer.email) || !buyer.address || !buyer.city) {
      toast.error("Please complete your shipping details.");
      return;
    }
    if (buyer.card.replace(/\s/g, "").length < 12) {
      toast.error("Please enter a valid card number.");
      return;
    }
    setOrder("AM-" + Date.now().toString().slice(-6));
    setView("done");
    toast.success("Order placed — a confirmation is on its way.");
  };

  const finish = () => {
    onCheckoutComplete();
    setView("bag");
    setPromo(null);
    setPromoInput("");
    setBuyer({ name: "", email: "", address: "", city: "", zip: "", card: "" });
    onClose();
  };

  const remaining = Math.max(0, FREE_SHIP - totals.subtotal);
  const shipProgress = Math.min(100, (totals.subtotal / FREE_SHIP) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-bone shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div className="flex items-center gap-2">
                {view !== "bag" && (
                  <button onClick={() => setView("bag")} className="text-stone-500 hover:text-ink">
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 className="font-serif text-xl text-ink">
                  {view === "bag" ? "Shopping Bag" : view === "checkout" ? "Checkout" : "Order Confirmed"}
                </h2>
                {view === "bag" && count > 0 && (
                  <span className="rounded-full bg-cobalt-soft px-2 py-0.5 text-xs font-semibold text-cobalt">{count}</span>
                )}
              </div>
              <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-stone-200">
                <X size={18} />
              </button>
            </div>

            {/* BAG */}
            {view === "bag" && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <ShoppingBag size={40} className="text-stone-300" />
                      <p className="mt-4 font-serif text-xl text-ink">Your bag is empty</p>
                      <p className="mt-1 text-sm text-stone-500">Explore the collection to add pieces.</p>
                      <button onClick={onClose} className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-cobalt">
                        Browse collection
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 rounded-xl bg-white p-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-ink">
                          <Truck size={15} className="text-cobalt" />
                          {remaining > 0 ? <>Add <b>{fmt(remaining)}</b> for free shipping</> : "You have unlocked free shipping"}
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                          <div className="h-full rounded-full bg-cobalt transition-all" style={{ width: `${shipProgress}%` }} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {items.map((i) => {
                          const unit = i.product.salePrice ?? i.product.price;
                          return (
                            <div key={keyOf(i)} className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-3">
                              <img src={i.product.image} alt={i.product.name} className="h-24 w-20 shrink-0 rounded-xl object-cover" />
                              <div className="flex flex-1 flex-col">
                                <div className="flex justify-between gap-2">
                                  <p className="font-medium leading-tight text-ink">{i.product.name}</p>
                                  <button onClick={() => onRemove(i)} className="text-stone-400 hover:text-red-500">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                <p className="mt-0.5 text-xs text-stone-500">{i.size} · {i.color}</p>
                                <div className="mt-auto flex items-center justify-between pt-2">
                                  <div className="flex items-center rounded-full border border-stone-300">
                                    <button onClick={() => onQuantityChange(i, i.quantity - 1)} className="px-2.5 py-1.5 text-stone-600 hover:text-ink"><Minus size={13} /></button>
                                    <span className="w-6 text-center text-sm">{i.quantity}</span>
                                    <button onClick={() => onQuantityChange(i, i.quantity + 1)} className="px-2.5 py-1.5 text-stone-600 hover:text-ink"><Plus size={13} /></button>
                                  </div>
                                  <p className="text-sm font-semibold text-ink">{fmt(unit * i.quantity)}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Promo */}
                      <div className="mt-5">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              value={promoInput}
                              onChange={(e) => setPromoInput(e.target.value)}
                              placeholder="Promo code"
                              className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-9 pr-3 text-sm uppercase outline-none focus:border-cobalt"
                            />
                          </div>
                          <button onClick={applyPromo} className="rounded-full border border-stone-300 px-4 text-sm font-medium text-ink hover:border-cobalt hover:text-cobalt">Apply</button>
                        </div>
                        {promo && <p className="mt-2 flex items-center gap-1 text-xs text-sage"><Check size={13} /> {promo.label} applied</p>}
                      </div>
                    </>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-stone-200 bg-white px-5 py-4">
                    <Summary totals={totals} />
                    <button onClick={() => setView("checkout")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-medium text-white transition hover:bg-cobalt-bright active:scale-[0.98]">
                      Proceed to Checkout <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* CHECKOUT */}
            {view === "checkout" && (
              <form onSubmit={placeOrder} className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
                <div className="space-y-3">
                  <Field label="Full name" value={buyer.name} onChange={(v) => setBuyer((b) => ({ ...b, name: v }))} placeholder="Jordan Avery" />
                  <Field label="Email" type="email" value={buyer.email} onChange={(v) => setBuyer((b) => ({ ...b, email: v }))} placeholder="you@email.com" />
                  <Field label="Shipping address" value={buyer.address} onChange={(v) => setBuyer((b) => ({ ...b, address: v }))} placeholder="123 Market St" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="City" value={buyer.city} onChange={(v) => setBuyer((b) => ({ ...b, city: v }))} placeholder="San Francisco" />
                    <Field label="ZIP" value={buyer.zip} onChange={(v) => setBuyer((b) => ({ ...b, zip: v }))} placeholder="94103" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-stone-600">Card number</label>
                    <div className="relative">
                      <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        value={buyer.card}
                        onChange={(e) => setBuyer((b) => ({ ...b, card: e.target.value }))}
                        inputMode="numeric"
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cobalt"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <Summary totals={totals} />
                </div>
                <p className="mt-3 text-center text-xs text-stone-400">This is a demo checkout. No card is charged.</p>

                <div className="mt-auto pt-4">
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition hover:bg-cobalt active:scale-[0.98]">
                    Place order · {fmt(totals.total)}
                  </button>
                </div>
              </form>
            )}

            {/* DONE */}
            {view === "done" && (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 text-sage">
                  <Check size={30} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-ink">Thank you</h3>
                <p className="mt-2 text-sm text-stone-500">Order <span className="font-semibold text-ink">{order}</span> is confirmed. A receipt was sent to your email.</p>
                <div className="mt-6 w-full rounded-2xl bg-white p-4 text-left text-sm">
                  <div className="flex justify-between"><span className="text-stone-500">Items</span><span className="text-ink">{count}</span></div>
                  <div className="mt-1 flex justify-between"><span className="text-stone-500">Total paid</span><span className="font-semibold text-ink">{fmt(totals.total)}</span></div>
                </div>
                <button onClick={finish} className="mt-6 w-full rounded-full bg-cobalt px-6 py-3.5 text-sm font-medium text-white hover:bg-cobalt-bright">
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Summary({ totals }: { totals: { subtotal: number; discount: number; shipping: number; tax: number; total: number } }) {
  return (
    <div className="space-y-1.5 text-sm">
      <Row label="Subtotal" value={fmt(totals.subtotal)} />
      {totals.discount > 0 && <Row label="Discount" value={`-${fmt(totals.discount)}`} accent />}
      <Row label="Shipping" value={totals.shipping === 0 ? "Free" : fmt(totals.shipping)} />
      <Row label="Tax" value={fmt(totals.tax)} />
      <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 text-base font-semibold text-ink">
        <span>Total</span><span>{fmt(totals.total)}</span>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-stone-500">{label}</span>
      <span className={accent ? "text-sage" : "text-ink"}>{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-600">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-cobalt" />
    </div>
  );
}