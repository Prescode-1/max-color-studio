import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Twitter, Instagram, Facebook, Phone, Mail, MapPin, Lock } from "lucide-react";
import { useSocial } from "@/lib/social";
import { useAdmin } from "@/lib/admin-store";

// TikTok icon (lucide doesn't ship one)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3a5.5 5.5 0 0 0 5 5v3a8.5 8.5 0 0 1-5-1.6V15a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 2.8 2.8V3h3.2Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const social = useSocial();
  const branding = useAdmin((s) => s.branding);

  return (
    <footer className="relative border-t border-border/50 mt-24">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-40 w-[60%] glow-blue opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-display text-2xl font-bold">
              {branding.brandPrefix}<span className="text-primary">{branding.brandSuffix}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{branding.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {[
                { href: social.twitter.url,   Icon: Twitter,    label: "Twitter" },
                { href: social.instagram.url, Icon: Instagram,  label: "Instagram" },
                { href: social.facebook.url,  Icon: Facebook,   label: "Facebook" },
                { href: social.tiktok.url,    Icon: TikTokIcon, label: "TikTok" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/60 hover:text-primary hover:shadow-[0_0_20px_-4px_var(--glow)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <a href={social.phone.url} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Phone className="h-3.5 w-3.5" />
                {social.phone.display}
              </a>
              <a href={social.email.url} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Mail className="h-3.5 w-3.5" />
                {social.email.display}
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  {branding.addressLine1}, {branding.addressLine2}
                  <br />
                  {branding.city}, {branding.country}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">Studio</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/services/$slug" params={{ slug: "full-body" }} className="hover:text-primary">Full Body</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "caliper" }} className="hover:text-primary">Caliper</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "wheels" }} className="hover:text-primary">Wheels</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "ceramic-coating" }} className="hover:text-primary">Ceramic</Link></li>
              <li><Link to="/services/$slug" params={{ slug: "ppf" }} className="hover:text-primary">PPF</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/portfolio"   className="hover:text-primary">Portfolio</Link></li>
              <li><Link to="/visualizer"  className="hover:text-primary">Visualizer</Link></li>
              <li><Link to="/contact"     className="hover:text-primary">Contact</Link></li>
              <li><Link to="/book"        className="hover:text-primary">Book</Link></li>
              <li><Link to="/dashboard"   className="hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {branding.brandPrefix} {branding.brandSuffix}. {t("footer.rights")}</span>
          <div className="flex items-center gap-4">
            <span>Crafted in matte black.</span>
            <Link
              to="/admin"
              aria-label="Admin dashboard"
              title="Admin dashboard"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Lock className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
