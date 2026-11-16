import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Download,
  Sparkles,
} from "lucide-react";
import { MORNING_SLOTS, AFTERNOON_SLOTS } from "@/data/mockData";

const CONSULTATION_DURATION_MINUTES = 60;
const CONSULTATION_DURATION = "1 hour";
const CONSULTATION_FEE = "$10 USD";

const SERVICES = [
  {
    id: "car-dealership",
    name: "Car Dealership",
    tagline: "Discuss vehicle preferences, budget, and purchase timelines.",
    preferences: ["Vehicle make, model, or body type", "New or used vehicle", "Budget and purchase timeline"],
  },
  {
    id: "shipping",
    name: "Shipping",
    tagline: "Discuss cargo, destinations, delivery timelines, and documentation.",
    preferences: ["Cargo type, weight, and dimensions", "Pickup location and destination", "Preferred delivery date"],
  },
  {
    id: "fabrication",
    name: "Fabrication (Metallurgy)",
    tagline: "Discuss materials, specifications, and timelines for metal fabrication.",
    preferences: ["Project type and intended use", "Preferred metal, dimensions, and finish", "Drawings, quantities, and target deadline"],
  },
];

type Service = (typeof SERVICES)[number];

interface Booking {
  ref: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}


const BOOKINGS_KEY = "innoeki_bookings";
const STEPS = ["Service", "Schedule", "Project Details", "Review"];

function availableDates(): Date[] {
  const out: Date[] = [];
  const today = new Date();
  let cursor = addDays(today, 1);
  while (out.length < 14) {
    if (cursor.getDay() !== 0) out.push(cursor); // studio closed Sundays
    cursor = addDays(cursor, 1);
  }
  return out;
}

function slotOpen(dateISO: string, slot: string): boolean {
  let h = 0;
  for (const ch of dateISO + slot) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h % 5 !== 0;
}

function downloadICS(b: Booking) {
  const dt = new Date(`${b.date}T${to24(b.timeSlot)}`);
  const end = new Date(dt.getTime() + CONSULTATION_DURATION_MINUTES * 60_000);
  const stamp = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Innoeki Clothings Brand//Consultation//EN",
    "BEGIN:VEVENT",
    `UID:${b.ref}@innoekiclothings`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(dt)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:Innoeki Clothings Brand — ${b.serviceName}`,
    `DESCRIPTION:Proposed consultation. Reference ${b.ref}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join(String.fromCharCode(13, 10));
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `innoeki-clothings-${b.ref}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function to24(slot: string): string {
  const [time, ap] = slot.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

export default function ConsultationBooking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({




    notes: "",
    name: "",
    email: "",
    phone: "",
  });
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const dates = useMemo(availableDates, []);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return !!service;
    if (step === 1) return !!date && !!slot;
    if (step === 2) return !!form.notes.trim();
    return !!form.name && /.+@.+\..+/.test(form.email);
  };

  const submit = () => {
    if (!service || !date || !slot) return;
    const ref = "ICI-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const booking: Booking = {
      ref,

      serviceName: service.name,
      date,
      timeSlot: slot,
      clientName: form.name,
      clientEmail: form.email,
      clientPhone: form.phone,




      notes: form.notes,


    };
    try {
      const prev = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify([booking, ...prev]));
    } catch {
      /* storage unavailable */
    }
    setConfirmed(booking);
    toast.success(`Consultation confirmed — ${ref}`);
  };

  const reset = () => {
    setStep(0);
    setService(null);
    setDate("");
    setSlot("");
    setForm({




      notes: "",
      name: "",
      email: "",
      phone: "",
    });
    setConfirmed(null);
  };

  return (
    <section
      id="consultation"
      className="scroll-mt-20 bg-ink py-20 text-stone-100 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            Business Services
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Book a consultation
          </h2>
          <p className="mt-4 text-stone-400">
            Choose a service, select a preferred time, and tell us what you would like to discuss.
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                    i < step
                      ? "bg-cobalt-bright text-white"
                      : i === step
                        ? "bg-white text-ink"
                        : "border border-stone-600 text-stone-500"
                  }`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </span>
                <span
                  className={`hidden text-xs sm:block ${
                    i === step ? "text-white" : "text-stone-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-px flex-1 ${
                    i < step ? "bg-cobalt-bright" : "bg-stone-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-stone-700/70 bg-stone-900/60 p-5 sm:p-8">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cobalt-bright text-white">
                  <Check size={26} />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-white">
                  Consultation details saved.
                </h3>
                <p className="mt-2 text-stone-400">
                  Saved reference{" "}
                  <span className="font-semibold text-white">{confirmed.ref}</span>
                </p>
                <div className="mx-auto mt-6 max-w-md space-y-2 rounded-2xl bg-stone-800 p-5 text-left text-sm">
                  <Row label="Service" value={confirmed.serviceName} />
                  <Row label="Duration" value={CONSULTATION_DURATION} />
                  <Row label="Consultation fee" value={CONSULTATION_FEE} />
                  <Row
                    label="When"
                    value={`${format(new Date(confirmed.date), "EEE, MMM d")} · ${confirmed.timeSlot}`}
                  />
                  <Row label="Name" value={confirmed.clientName} />

                </div>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    onClick={() => downloadICS(confirmed)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-stone-200 active:scale-[0.98]"
                  >
                    <Download size={16} /> Add to calendar (.ics)
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-600 px-6 py-3 text-sm font-medium text-white transition hover:border-white active:scale-[0.98]"
                  >
                    Book another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {step === 0 && (
                  <div className="grid gap-4 md:grid-cols-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setService(s)}
                        className={`flex flex-col rounded-2xl border p-5 text-left transition ${
                          service?.id === s.id
                            ? "border-cobalt-bright bg-cobalt-bright/10"
                            : "border-stone-700 hover:border-stone-500"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Sparkles
                            size={18}
                            className={
                              service?.id === s.id
                                ? "text-cobalt-bright"
                                : "text-stone-500"
                            }
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-xl text-white">{s.name}</h4>
                        <p className="mt-1 text-sm text-stone-400">{s.tagline}</p>
                        <p className="mt-4 text-xs font-semibold text-stone-200">Suggested preferences</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-stone-300">
                          {s.preferences.map((preference) => (
                            <li key={preference}>{preference}</li>
                          ))}
                        </ul>
                        <p className="mt-auto pt-4 text-sm font-semibold text-white">
                          {CONSULTATION_DURATION} · {CONSULTATION_FEE}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-300">
                      <Calendar size={16} /> Select a date
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {dates.map((d) => {
                        const iso = d.toISOString().slice(0, 10);
                        const on = date === iso;
                        return (
                          <button
                            key={iso}
                            onClick={() => {
                              setDate(iso);
                              setSlot("");
                            }}
                            className={`flex min-w-16 flex-col items-center rounded-xl border px-3 py-3 transition ${
                              on
                                ? "border-cobalt-bright bg-cobalt-bright text-white"
                                : "border-stone-700 text-stone-300 hover:border-stone-500"
                            }`}
                          >
                            <span className="text-[11px] uppercase">
                              {format(d, "EEE")}
                            </span>
                            <span className="font-serif text-xl">{format(d, "d")}</span>
                            <span className="text-[11px]">{format(d, "MMM")}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <SlotGroup
                        title="Morning"
                        slots={MORNING_SLOTS}
                        date={date}
                        selected={slot}
                        onPick={setSlot}
                      />
                      <SlotGroup
                        title="Afternoon"
                        slots={AFTERNOON_SLOTS}
                        date={date}
                        selected={slot}
                        onPick={setSlot}
                      />
                    </div>
                    {!date && (
                      <p className="mt-4 text-sm text-stone-500">
                        Pick a date to see time options.
                      </p>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-stone-300">
                        What would you like to discuss?
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        rows={3}
                        placeholder={service?.preferences.join(", ")}
                        className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-900 p-3 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-cobalt-bright"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <Field
                        label="Full name"
                        value={form.name}
                        onChange={(v) => set("name", v)}
                        placeholder="Jordan Avery"
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(v) => set("email", v)}
                        placeholder="you@email.com"
                      />
                      <Field
                        label="Phone (optional)"
                        value={form.phone}
                        onChange={(v) => set("phone", v)}
                        placeholder="+234"
                      />
                    </div>
                    <div className="rounded-2xl border border-stone-700 bg-stone-900 p-5">
                      <p className="font-serif text-lg text-white">Your booking</p>
                      <div className="mt-3 space-y-2 text-sm">
                        <Row label="Service" value={service?.name || "—"} />
                        <Row label="Duration" value={CONSULTATION_DURATION} />
                        <Row label="Consultation fee" value={CONSULTATION_FEE} />
                        <Row
                          label="When"
                          value={
                            date
                              ? `${format(new Date(date), "EEE, MMM d")} · ${slot}`
                              : "—"
                          }
                        />



                      </div>
                      <p className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                        Details are saved in this browser only.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!confirmed && (
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-stone-300 transition enabled:hover:text-white disabled:opacity-40"
              >
                <ArrowLeft size={16} /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition enabled:hover:bg-cobalt-bright enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => (canNext() ? submit() : toast.error("Please add your name and a valid email."))}
                  disabled={!canNext()}
                  className="inline-flex items-center gap-2 rounded-full bg-cobalt-bright px-6 py-3 text-sm font-medium text-white transition enabled:hover:bg-white enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save consultation details <Check size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SlotGroup({
  title,
  slots,
  date,
  selected,
  onPick,
}: {
  title: string;
  slots: string[];
  date: string;
  selected: string;
  onPick: (s: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-stone-300">{title}</p>
      <div className="flex flex-wrap gap-2">
        {slots.map((s) => {
          const open = date && slotOpen(date, s);
          return (
            <button
              key={s}
              disabled={!open}
              onClick={() => onPick(s)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selected === s
                  ? "border-cobalt-bright bg-cobalt-bright text-white"
                  : open
                    ? "border-stone-700 text-stone-300 hover:border-stone-500"
                    : "cursor-not-allowed border-stone-800 text-stone-600 line-through"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-stone-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-cobalt-bright"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-stone-400">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}