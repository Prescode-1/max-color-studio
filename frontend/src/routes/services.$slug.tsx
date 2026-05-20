import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { services, type Service } from "@/lib/data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.service.slug.replace(/-/g, " ") ?? "Service";
    const niceTitle = title.replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      meta: [
        { title: `${niceTitle} — Max Color` },
        { name: "description", content: `Premium ${niceTitle} service by Max Color — engineered for collectors.` },
        { property: "og:title", content: `${niceTitle} — Max Color` },
        { property: "og:description", content: `Premium ${niceTitle} service by Max Color.` },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <h1 className="text-display text-3xl font-bold">Service not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary">Back home</Link>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute right-0 top-20 h-[500px] w-[700px] glow-blue opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/" className="text-xs uppercase tracking-ultra text-muted-foreground hover:text-primary">
                ← {t("nav.home")}
              </Link>
              <h1 className="text-display chrome-text mt-4 text-5xl font-bold sm:text-6xl" data-text={t(service.titleKey)}>{t(service.titleKey)}</h1>
              <p className="mt-5 text-lg text-muted-foreground">{t(service.descKey)}</p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-xs uppercase tracking-ultra text-muted-foreground">From</span>
                <span className="text-display text-4xl font-bold text-primary">${service.priceFrom.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">· {service.duration}</span>
              </div>
              <Link to="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--glow-strong)]">
                Book this service <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 glow-blue opacity-60" />
              <div className="shine relative overflow-hidden rounded-2xl border border-border/60">
                <img src={service.image} alt={t(service.titleKey)} loading="lazy" className="relative w-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-display text-3xl font-bold sm:text-4xl">Technical Spec</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {service.specs.map((s: Service["specs"][number]) => (
            <div key={s.label} className="card-hover flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-card p-5">
              <div>
                <div className="text-xs uppercase tracking-ultra text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-sm font-medium">{s.value}</div>
              </div>
              <Check className="h-4 w-4 text-primary" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-display text-2xl font-bold">Related services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {services.filter((s: Service) => s.slug !== service.slug).map((s: Service) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="card-hover shine overflow-hidden rounded-xl border border-border/60 bg-card">
              <img src={s.image} alt={t(s.titleKey)} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-4">
                <div className="text-sm font-semibold">{t(s.titleKey)}</div>
                <div className="text-xs text-muted-foreground">From ${s.priceFrom.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
