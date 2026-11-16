import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ShoppingBag,
  X,
  Check,
  ArrowRight,
  Ruler,
} from "lucide-react";
import {
  BRAND,
  CATEGORIES,
  PRODUCTS,
  type Product,
} from "@/data/mockData";

interface ProductCatalogProps {
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
}

const price = (p: Product) => (p.salePrice ?? p.price);
const fmt = (n: number, currency?: Product["currency"]) =>
  currency === "NGN" ? `₦${n.toLocaleString("en-NG")}` : `${n.toLocaleString("en-US")}`;

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group text-left"
    >
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-cashmere">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`aspect-[3/4] w-full transition-transform duration-700 ease-out group-hover:scale-[1.05] ${product.imageFit === "contain" ? "object-contain" : "object-cover"}`}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cobalt backdrop-blur">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium text-white">
            Made to order
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-4 transition-transform duration-500 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
            View product details <ArrowRight size={15} />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">
            {product.category}
          </p>
          <h3 className="mt-1 font-serif text-lg leading-tight text-ink">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <p className="font-medium text-ink">{fmt(price(product), product.currency)}</p>
          {product.salePrice && (
            <p className="text-sm text-stone-400 line-through">{fmt(product.price, product.currency)}</p>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="h-3.5 w-3.5 rounded-full border border-stone-300"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </motion.button>
  );
}

function QuickView({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: ProductCatalogProps["onAddToCart"];
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-bone sm:rounded-3xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white active:scale-95"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-cashmere">
            <img
              src={product.image}
              alt={product.name}
              className={`h-full max-h-[60vh] w-full md:max-h-none ${product.imageFit === "contain" ? "object-contain" : "object-cover"}`}
            />
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cobalt">
                {product.category}
              </p>
              <h3 className="mt-2 font-serif text-3xl leading-tight text-ink">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-lg font-medium text-ink">
                  {fmt(price(product), product.currency)}
                </span>
                {product.salePrice && (
                  <span className="text-stone-400 line-through">
                    {fmt(product.price, product.currency)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-stone-600">
              {product.description}
            </p>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                Colour — {color}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                      color === c.name
                        ? "border-cobalt bg-cobalt-soft text-cobalt"
                        : "border-stone-300 text-stone-600 hover:border-stone-400"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {product.sizes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        size === s
                          ? "border-ink bg-ink text-white"
                          : "border-stone-300 text-ink hover:border-stone-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm text-stone-600">
              <Ruler size={16} className="mt-0.5 shrink-0 text-cobalt" />
              <span>{product.fitGuide}</span>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                {product.sizes.length ? "Fabric & care" : "Product details"}
              </p>
              <ul className="space-y-1.5">
                {product.fabricDetails.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                    <Check size={14} className="text-sage" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {product.sizes.length === 0 ? (
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(product.name + " enquiry")}`}
                className="mt-auto rounded-full bg-cobalt px-6 py-3.5 text-center text-sm font-medium text-white hover:bg-cobalt-bright"
              >
                Enquire about sizes and ordering
              </a>
            ) : (
              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="flex items-center rounded-full border border-stone-300">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-stone-600 hover:text-ink"
                  >
                    &minus;
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    className="px-3.5 py-2.5 text-stone-600 hover:text-ink"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(product, size, color, qty);
                    onClose();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-medium text-white transition hover:bg-cobalt-bright active:scale-[0.98]"
                >
                  <ShoppingBag size={17} />
                  {product.inStock ? "Add to Bag" : "Enquire to Order"}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductCatalog({ onAddToCart }: ProductCatalogProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
    if (sort === "low") list = [...list].sort((a, b) => Number(!!b.currency) - Number(!!a.currency) || price(a) - price(b));
    if (sort === "high") list = [...list].sort((a, b) => Number(!!b.currency) - Number(!!a.currency) || price(b) - price(a));
    return list;
  }, [category, query, sort]);

  return (
    <section id="collection" className="scroll-mt-20 bg-bone py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
              The Collection
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Shop ready-to-wear clothing and footwear
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pieces"
                className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-cobalt sm:w-56"
              />
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-full border border-stone-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-ink outline-none transition focus:border-cobalt"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500"
              />
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-y border-stone-200 py-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? "bg-ink text-white"
                  : "text-stone-600 hover:bg-stone-200/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="font-serif text-2xl text-ink">No pieces match your search.</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-4 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-ink hover:border-cobalt hover:text-cobalt"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <QuickView
            product={active}
            onClose={() => setActive(null)}
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
