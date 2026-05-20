import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, Twitter, Instagram, Facebook } from "lucide-react";
import { useAdmin } from "@/lib/admin-store";
import { useSocial } from "@/lib/social";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Max Color" },
      { name: "description", content: "Visit Max Color studio. Address, phone, email, and studio hours." },
      { property: "og:title", content: "Contact — Max Color" },
      { property: "og:description", content: "Reach the Max Color paint booth — address, phone, email." },
    ],
  }),
  component: Contact,
});

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3a5.5 5.5 0 0 0 5 5v3a8.5 8.5 0 0 1-5-1.6V15a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 2.8 2.8V3h3.2Z" />
    </svg>
  );
}

function Contact() {
  const { t } = useTranslation();
  const branding = useAdmin((s) => s.branding);
  const content = useAdmin((s) => s.content);
  const social = useSocial();

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${branding.addressLine1} ${branding.addressLine2} ${branding.city} ${branding.country}`
  )}`;

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="absolute right-0 top-10 h-[400px] w-[600px] glow-blue opacity-40" />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
        <h1 className="text-display chrome-text text-5xl font-bold sm:text-6xl" data-text={content.contactTitle}>
          {content.contactTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{content.contactSubtitle}</p>
      </motion.div>

      <div className="relative mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Info column */}
        <div className="space-y-4">
          <p className="text-base text-muted-foreground">{content.contactBody}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Card icon={<MapPin className="h-4 w-4" />} label={t("contact.address")}>
              <div className="text-sm font-medium text-foreground">{branding.addressLine1}</div>
              <div className="text-sm text-muted-foreground">{branding.addressLine2}</div>
              <div className="text-sm text-muted-foreground">{branding.city}</div>
              <div className="text-sm text-muted-foreground">{branding.country}</div>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                {t("contact.directions")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
              </a>
            </Card>

            <Card icon={<Phone className="h-4 w-4" />} label={t("contact.phone")}>
              <a href={social.phone.url} className="text-sm font-medium text-foreground hover:text-primary">
                {social.phone.display}
              </a>
              <a
                href={social.phone.url}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                <Phone className="h-3 w-3" /> {t("contact.call")}
              </a>
            </Card>

            <Card icon={<Mail className="h-4 w-4" />} label={t("contact.email")}>
              <a href={social.email.url} className="text-sm font-medium text-foreground hover:text-primary">
                {social.email.display}
              </a>
            </Card>

            <Card icon={<Clock className="h-4 w-4" />} label={t("contact.hours")}>
              <div className="text-sm font-medium text-foreground">{branding.workingHours}</div>
              <div className="mt-1 text-xs text-muted-foreground">Sundays by appointment.</div>
            </Card>
          </div>

          {/* Socials */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">Follow the booth</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { Icon: Twitter,    href: social.twitter.url,   handle: social.twitter.handle },
                { Icon: Instagram,  href: social.instagram.url, handle: social.instagram.handle },
                { Icon: Facebook,   href: social.facebook.url,  handle: social.facebook.handle },
                { Icon: TikTokIcon, href: social.tiktok.url,    handle: social.tiktok.handle },
              ].map(({ Icon, href, handle }) => (
                <a
                  key={handle}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{handle}</span>
                </a>
              ))}
            </div>
          </div>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--glow-strong)]"
          >
            Book consultation <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* Map */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border/60 bg-card">
          <iframe
            title={`${branding.brandPrefix} ${branding.brandSuffix} location`}
            src={branding.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) invert(0.92) hue-rotate(180deg)" }}
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="card-hover relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="absolute -right-8 -top-8 h-24 w-24 glow-blue opacity-40" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-ultra text-muted-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">{icon}</span>
          {label}
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
