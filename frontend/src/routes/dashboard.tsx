import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Max Color" }] }),
  component: Dashboard,
});

const stages = ["Intake", "Strip", "Primer", "Base coat", "Clear coat", "Cure", "QC"];

function Dashboard() {
  const { t } = useTranslation();
  const current = 3; // base coat
  const pct = ((current + 1) / stages.length) * 100;

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-16">
      <div className="absolute right-0 top-10 h-[300px] w-[500px] glow-blue opacity-40" />
      <div className="relative">
        <h1 className="text-display text-5xl font-bold">{t("dashboard.title")}</h1>

        <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-ultra text-muted-foreground">Project · #MC-2841</div>
              <div className="text-display mt-1 text-2xl font-semibold">2019 GT Coupe — Stealth Black</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-ultra text-muted-foreground">{t("dashboard.progress")}</div>
              <div className="text-display mt-1 text-3xl font-bold text-primary">{Math.round(pct)}%</div>
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 shadow-[0_0_20px_var(--glow)]"
            />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-7">
            {stages.map((s, i) => (
              <div key={s} className="text-center">
                <div className={`mx-auto h-3 w-3 rounded-full ${i <= current ? "bg-primary shadow-[0_0_10px_var(--glow)]" : "bg-muted"}`} />
                <div className={`mt-2 text-[10px] font-medium ${i === current ? "text-primary" : i < current ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <div className="text-xs uppercase tracking-ultra text-muted-foreground">{t("dashboard.stage")}</div>
            <div className="mt-1 text-sm font-medium">{stages[current]} — applying second base coat. ETA next stage: 18h.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
