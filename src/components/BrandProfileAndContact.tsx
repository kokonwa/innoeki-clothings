import founderPortrait from "@/assets/frank-ogiakha-innocent.jpeg";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Quote,
  Star,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Send,
  ArrowRight,
} from "lucide-react";
import {
  BRAND,
  TIMELINE,
  TESTIMONIALS,
  PRESS,
} from "@/data/mockData";

const ETHOS = [
  "Traceable fibers",
  "Zero-waste cutting",
  "Made in studio",
  "Fit-first tailoring",
];

const TOPICS = ["Order enquiry", "Styling question", "Press", "Wholesale", "Other"];

export default function BrandProfileAndContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !/.+@.+\..+/.test(form.email) || form.message.length < 4) {
      toast.error("Please add your name, a valid email, and a short message.");
      return;
    }
    toast.success("Message sent — we reply within one business day.");
    setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
  };

  return (
    <>
      {/* Brand story */}
      <section id="story" className="scroll-mt-20 bg-cashmere py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <img
                src={founderPortrait}
                alt="Frank Ogiakha Innocent standing inside the Innoeki clothing store"
                loading="lazy"
                className="mb-4 h-auto w-full rounded-[2rem] border border-stone-200 shadow-xl shadow-stone-300/40"
              />
              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cobalt font-serif text-sm font-semibold text-white">
                  {BRAND.monogram}
                </span>
                <div>
                  <p className="font-serif text-lg leading-tight text-ink">Frank Ogiakha Innocent</p>
                  <p className="text-xs text-stone-500">Founder &amp; Creative Director</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                The Brand
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
                A studio built on fit, fabric, and honesty.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
                <p>
                  Innoeki Clothings Brand began at a single cutting table
                  with one belief: clothing should be made to be lived in, not
                  photographed and forgotten. Every piece is patterned, sampled,
                  and finished in our Foundry Lane studio under the direction of
                  master tailor Frank Ogiakha Innocent.
                </p>
                <p>
                  We pair that craft with a personal styling practice, so the
                  wardrobe you leave with actually fits the life you have. Fewer,
                  better, made well.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {ETHOS.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-ink"
                  >
                    {e}
                  </span>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-10 space-y-6 border-l border-stone-300 pl-6">
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-cobalt bg-cashmere" />
                    <p className="font-serif text-xl text-cobalt">{t.year}</p>
                    <p className="mt-0.5 font-medium text-ink">{t.title}</p>
                    <p className="mt-1 text-sm text-stone-600">{t.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <h3 className="text-center font-serif text-3xl text-ink">
              What clients say
            </h3>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6"
                >
                  <Quote size={26} className="text-cobalt" />
                  <div className="mt-3 flex gap-0.5 text-cobalt">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-stone-700">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 border-t border-stone-100 pt-3">
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
              {PRESS.map((p) => (
                <span key={p} className="font-serif text-lg tracking-wide text-ink">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-bone py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                Get in touch
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-ink">
                Questions about a piece or a fitting?
              </h2>
              <p className="mt-4 max-w-md text-stone-600">
                Write to the studio and a stylist will reply personally. For
                bookings, use the consultation scheduler above.
              </p>

              <div className="mt-8 space-y-4">
                <ContactRow icon={<Mail size={18} />} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} />
                <ContactRow icon={<Phone size={18} />} label="Phone" value={BRAND.phone} href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`} />
                <ContactRow icon={<MapPin size={18} />} label="Studio" value={`${BRAND.address} · ${BRAND.hours}`} />
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a href={BRAND.instagram} aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-ink transition hover:border-cobalt hover:text-cobalt">
                  <Instagram size={19} />
                </a>
                <a href={BRAND.pinterest} aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-ink transition hover:border-cobalt hover:text-cobalt">
                  <Linkedin size={19} />
                </a>
              </div>
            </div>

            <form
              onSubmit={submit}
              className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8"
            >
              <div className="space-y-4">
                <Labeled label="Name">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="input"
                  />
                </Labeled>
                <Labeled label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@email.com"
                    className="input"
                  />
                </Labeled>
                <Labeled label="Topic">
                  <select
                    value={form.topic}
                    onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    className="input"
                  >
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Labeled>
                <Labeled label="Message">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="How can we help?"
                    className="input resize-none"
                  />
                </Labeled>
              </div>
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-medium text-white transition hover:bg-cobalt-bright active:scale-[0.98]"
              >
                <Send size={16} /> Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-cobalt-soft text-cobalt">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition hover:opacity-70">
      {body}
    </a>
  ) : (
    body
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-600">{label}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-ink py-14 text-stone-300">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-cobalt-bright font-serif text-sm font-semibold text-white">
                {BRAND.monogram}
              </span>
              <span className="font-serif text-xl text-white">{BRAND.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-stone-400">{BRAND.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {["Collection", "Consultation", "Brand Story", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l === "Brand Story" ? "story" : l.toLowerCase()}`}
                className="text-stone-400 transition hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-cobalt-bright hover:text-white"
          >
            Book styling <ArrowRight size={15} />
          </a>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-stone-700/60 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Handmade in San Francisco</p>
        </div>
      </div>
    </footer>
  );
}