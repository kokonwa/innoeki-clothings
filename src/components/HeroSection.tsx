import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { BRAND, HERO_IMAGE, STATS } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-bone pt-24"
    >
      {/* soft editorial backdrop accents */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cobalt-soft blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cashmere blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-10 md:grid-cols-2 md:gap-8 md:px-8">
        {/* Left column */}
        <div className="relative z-10">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cobalt"
          >
            <Sparkles size={14} strokeWidth={1.8} />
            Autumn / Winter Lookbook
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Curated Garments.
            <span className="block italic text-cobalt">Bespoke Styling.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-stone-600 sm:text-lg"
          >
            {BRAND.tagline} Considered clothing made in our studio, paired with
            private styling for the way you actually live.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#collection"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-cobalt active:scale-[0.98]"
            >
              Explore Collection
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#consultation"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-7 py-3.5 text-sm font-medium text-ink transition-all hover:border-cobalt hover:text-cobalt active:scale-[0.98]"
            >
              <Calendar size={17} strokeWidth={1.7} />
              Book a Consultation
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="show"
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-stone-200 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-3xl text-ink">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-stone-500">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right column image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl shadow-stone-300/40">
            <img
              src={HERO_IMAGE}
              alt="Editorial lookbook of tailored contemporary clothing"
              className="aspect-[4/5] w-full object-cover md:aspect-[5/6]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          {/* floating tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -left-4 bottom-8 rounded-2xl border border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur sm:-left-8"
          >
            <p className="font-serif text-lg leading-none text-ink">Hand-finished</p>
            <p className="mt-1 text-xs text-stone-500">in the Foundry studio</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}