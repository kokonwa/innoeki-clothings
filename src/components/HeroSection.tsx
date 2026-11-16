import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import colourblockTracksuit from "@/assets/colourblock-tracksuit.jpg";

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

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Ready-to-wear fashion
            <span className="block italic text-cobalt">from other brands.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-stone-600 sm:text-lg"
          >
            Shop clothing and footwear selected by Innoeki, from casual sets and denim
            to dresses and sandals.
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
              src={colourblockTracksuit}
              alt="Colourblock Tracksuit Set in yellow and blue and in white and blue"
              className="aspect-[5/4] w-full object-cover"
              loading="eager"
            />
          </div>
          <p className="mt-3 text-sm text-stone-600">Colourblock Tracksuit Set</p>
        </motion.div>
      </div>
    </section>
  );
}