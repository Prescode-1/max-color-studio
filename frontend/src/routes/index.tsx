import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Palette, Wrench } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { services } from "@/lib/data";
import { WaterDroplets } from "@/components/WaterDroplets";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { useAdmin } from "@/lib/admin-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Max Color — Premium Automotive Painting" },
      { name: "description", content: "Showroom-grade automotive painting. Full body, caliper, wheels. Engineered for collectors and tuners." },
    ],
  }),
  component: Index,
});

const featureIcons = { color: Palette, ceramic: Shield, chrome: Sparkles, custom: Wrench };

function Index() {
  const { t } = useTranslation();
  const content = useAdmin((s) => s.content);
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[700px] w-[1100px] glow-blue opacity-70" />

        <div className="relative mx-auto max-w-7xl px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-ultra text-primary">
                {content.heroEyebrow}
              </span>
              <h1 className="text-display chrome-text mt-6 text-5xl font-bold sm:text-6xl md:text-7xl" data-text={content.heroTitle}>
                {content.heroTitle}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {content.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/book" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--glow-strong)] transition-all hover:shadow-[0_0_60px_-4px_var(--glow-strong)]">
                  {t("hero.cta")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
                <Link to="/visualizer" className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary">
                  {t("hero.secondary")}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto mt-12 max-w-5xl"
          >
            <div className="absolute inset-x-10 top-1/2 h-[400px] -translate-y-1/2 glow-blue opacity-90" />
            <div className="shine relative w-full overflow-hidden rounded-2xl">
              <img
                src={heroCar}
                alt="Featured Max Color luxury car"
                width={1920}
                height={1080}
                className="relative w-full"
              />
              <WaterDroplets count={18} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-ultra text-primary">— Studio</span>
            <h2 className="text-display mt-3 text-4xl font-bold sm:text-5xl">{content.brandTitle}</h2>
          </div>
          <p className="text-lg text-muted-foreground">{content.brandBody}</p>
        </div>
      </section>

      {/* SERVICES — 3 column */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-display text-4xl font-bold sm:text-5xl">{content.servicesTitle}</h2>
          <p className="mt-3 text-muted-foreground">{content.servicesSubtitle}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link to="/services/$slug" params={{ slug: s.slug }} className="card-hover shine group block overflow-hidden rounded-2xl border border-border/60 bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={t(s.titleKey)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-display text-xl font-semibold">{t(s.titleKey)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(s.descKey)}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    {t("services.cta")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES — 2x2 */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-display text-4xl font-bold sm:text-5xl">{content.featuresTitle}</h2>
          <p className="mt-3 text-muted-foreground">{content.featuresSubtitle}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {(["color", "ceramic", "chrome", "custom"] as const).map((k, i) => {
            const Icon = featureIcons[k];
            return (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-hover relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 glow-blue opacity-50" />
                <div className="relative">
                  <div className="spray relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-display mt-5 text-xl font-semibold">{t(`features.items.${k}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`features.items.${k}.desc`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-display chrome-text text-4xl font-bold sm:text-5xl" data-text="See the transformation">
            See the transformation
          </h2>
          <p className="mt-3 text-muted-foreground">Drag the slider — dirty to showroom-fresh.</p>
        </div>
        <div className="mt-10">
          <BeforeAfterSlider image={heroCar} alt="Max Color showcase" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-background p-12 text-center sm:p-20">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] glow-blue opacity-70" />
          <div className="relative">
            <h2 className="text-display text-4xl font-bold sm:text-5xl">{content.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{content.ctaBody}</p>
            <Link to="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_50px_-8px_var(--glow-strong)]">
              {t("cta.button")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
