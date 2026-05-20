import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "@/lib/data";
import { useAdmin } from "@/lib/admin-store";


export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book — Max Color" },
      { name: "description", content: "Reserve your slot at the Max Color paint booth — real-time studio availability." },
      { property: "og:title", content: "Book — Max Color" },
      { property: "og:description", content: "Reserve your slot at the Max Color paint booth." },
    ],
  }),
  component: Book,
});

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function Book() {
  const { t } = useTranslation();
  const content = useAdmin((s) => s.content);
  const addBooking = useAdmin((s) => s.addBooking);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState(services[0].slug);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const svc = services.find((s) => s.slug === service);
    
    // Save to local state (for instant admin dashboard sync)
    addBooking({
      customer: name, email, phone,
      service: svc ? t(svc.titleKey) : service,
      date, time, status: "pending",
    });



    setDone(true);
  };

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-16">
      <div className="absolute right-0 top-20 h-[400px] w-[500px] glow-blue opacity-50" />
      <div className="relative">
        <h1 className="text-display text-5xl font-bold">{content.bookingTitle}</h1>
        <p className="mt-3 text-muted-foreground">{content.bookingSubtitle}</p>

        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 flex items-start gap-4 rounded-2xl border border-primary/40 bg-primary/10 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <div className="text-display text-lg font-semibold">{t("booking.success")}</div>
              <div className="mt-1 text-sm text-muted-foreground">{date} · {time} · {services.find((s) => s.slug === service)?.slug}</div>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-6 rounded-2xl border border-border/60 bg-card p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("booking.date")}>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="input" />
              </Field>
              <Field label={t("booking.time")}>
                <select required value={time} onChange={(e) => setTime(e.target.value)} className="input">
                  <option value="">—</option>
                  {times.map((tm) => <option key={tm}>{tm}</option>)}
                </select>
              </Field>
            </div>
            <Field label={t("booking.service")}>
              <select required value={service} onChange={(e) => setService(e.target.value)} className="input">
                {services.map((s) => <option key={s.slug} value={s.slug}>{t(s.titleKey)}</option>)}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("booking.name")}><input required value={name} onChange={(e) => setName(e.target.value)} className="input" /></Field>
              <Field label={t("booking.email")}><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></Field>
            </div>
            <Field label={t("booking.phone")}><input required value={phone} onChange={(e) => setPhone(e.target.value)} className="input" /></Field>
            <button type="submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--glow-strong)] transition-all hover:shadow-[0_0_60px_-4px_var(--glow-strong)]">
              {t("booking.confirm")}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .input {
          width: 100%;
          background: var(--input);
          border: 1px solid color-mix(in oklch, var(--primary) 15%, transparent);
          border-radius: 10px;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 150ms ease;
        }
        .input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-ultra text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
