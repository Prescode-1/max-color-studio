import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { portfolio } from "@/lib/data";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Max Color" },
      { name: "description", content: "Selected paint, caliper, wheel and ceramic work from the Max Color booth." },
      { property: "og:title", content: "Portfolio — Max Color" },
      { property: "og:description", content: "Selected paint, caliper and wheel work from the booth." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const { t } = useTranslation();
  const content = useAdmin((s) => s.content);
  const cats = useMemo(() => ["All", ...Array.from(new Set(portfolio.map((p) => p.category)))], []);
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? portfolio : portfolio.filter((p) => p.category === cat);

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="absolute right-0 top-10 h-[400px] w-[600px] glow-blue opacity-40" />
      <div className="relative">
        <h1 className="text-display text-5xl font-bold sm:text-6xl">{content.portfolioTitle}</h1>
        <p className="mt-3 text-muted-foreground">{content.portfolioSubtitle}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {c === "All" ? t("portfolio.all") : c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="card-hover shine group overflow-hidden rounded-2xl border border-border/60 bg-card"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-card p-8 text-center">
          <h2 className="text-display text-2xl font-bold">Like what you see?</h2>
          <p className="text-sm text-muted-foreground">Book your slot or preview your build in the visualizer.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Book consultation <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link to="/visualizer" className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-semibold hover:border-primary/60 hover:text-primary">
              Try visualizer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
