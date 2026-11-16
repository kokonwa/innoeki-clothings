import founderPortrait from "@/assets/frank-ogiakha-innocent.jpeg";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Send,
  ArrowRight,
} from "lucide-react";
import { BRAND } from "@/data/mockData";

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
                About Innoeki
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
                <p>
                  Founded by Frank Ogiakha Innocent, Innoeki Clothings Brand is
                  a ready-to-wear fashion label offering finished clothing
                  for everyday wear and special occasions.
                </p>
                <p>
                  Our collections bring together complete outfits and
                  individual pieces you can pair with what you already wear.
                </p>
              </div>

              <a
                href="#collection"
                className="mt-8 inline-flex items-center gap-2 font-medium text-cobalt hover:underline"
              >
                Explore the collection <ArrowRight size={16} />
              </a>
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
            Book a Consultation <ArrowRight size={15} />
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