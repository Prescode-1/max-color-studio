import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { carImages, carList, palette, type CarId, type ColorId } from "@/lib/cars";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/visualizer")({
  head: () => ({
    meta: [
      { title: "Color Visualizer — Max Color" },
      { name: "description", content: "Preview real cars in any Max Color finish — pearl, candy, chrome and more." },
      { property: "og:title", content: "Color Visualizer — Max Color" },
      { property: "og:description", content: "Preview real cars in any finish before you book." },
    ],
  }),
  component: Visualizer,
});

function Visualizer() {
  const content = useAdmin((s) => s.content);
  const [car, setCar] = useState<CarId>("coupe");
  const [color, setColor] = useState<ColorId>("electric");

  const activeColor = palette.find((p) => p.id === color)!;
  const imgSrc = carImages[car][color];

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-16">
      <div
        className="absolute left-1/2 top-40 -translate-x-1/2 h-[500px] w-[800px] glow-blue opacity-60"
        style={{ background: `radial-gradient(closest-side, ${activeColor.hex}66, transparent 70%)`, filter: "blur(60px)" }}
      />

      <div className="relative text-center">
        <h1 className="text-display text-5xl font-bold sm:text-6xl">{content.visualizerTitle}</h1>
        <p className="mt-3 text-muted-foreground">{content.visualizerSubtitle}</p>
      </div>

      <div className="relative mt-12 grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-border/60 bg-card p-4 sm:p-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${car}-${color}`}
                src={imgSrc}
                alt={`${car} in ${activeColor.label}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="mt-6 text-center">
            <div className="text-xs uppercase tracking-ultra text-muted-foreground">Studio Preview</div>
            <div className="text-display mt-1 text-2xl font-bold">{activeColor.label}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">Select vehicle</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {carList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCar(c.id)}
                  className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${
                    car === c.id ? "border-primary bg-primary/15 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">Pick color</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {palette.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setColor(p.id)}
                  className={`group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                    color === p.id ? "border-primary" : "border-border/60 hover:border-primary/40"
                  }`}
                >
                  <span
                    className="h-10 w-10 rounded-full border border-white/10"
                    style={{ background: p.hex, boxShadow: `0 0 30px -5px ${p.hex}` }}
                  />
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/book"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_var(--glow-strong)]"
          >
            Book this finish <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
