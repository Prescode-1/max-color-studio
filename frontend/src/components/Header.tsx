import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Search, Globe, Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/admin-store";

const langs = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "de", label: "DE" },
] as const;

export function Header({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { t, i18n } = useTranslation();
  const loc = useLocation();
  const branding = useAdmin((s) => s.branding);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    setMobileOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/services/$slug" as const, params: { slug: "full-body" }, label: t("nav.services") },
    { to: "/portfolio" as const, label: t("nav.shop") },
    { to: "/visualizer" as const, label: t("nav.company") },
    { to: "/contact" as const, label: t("nav.contacts") },
    { to: "/book" as const, label: t("nav.book") },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary/40" />
                <div className="absolute inset-0 glow-blue opacity-60" />
              </div>
              <span className="text-display text-lg font-bold tracking-tight">
                {branding.brandPrefix}<span className="text-primary">{branding.brandSuffix}</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => {
                const active =
                  loc.pathname === l.to ||
                  (l.to !== "/" && loc.pathname.startsWith(l.to.split("/$")[0]));
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    params={l.params as never}
                    className={`speed-trail relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="hidden h-9 items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:flex"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
                <span>{t("nav.search")}</span>
                <kbd className="ms-2 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
              </button>

              <button
                onClick={onOpenSearch}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 sm:hidden"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex h-9 items-center gap-1 rounded-lg border border-border/60 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{i18n.language.toUpperCase()}</span>
                </button>
                {langOpen && (
                  <div
                    className="absolute end-0 mt-2 w-24 overflow-hidden rounded-lg border border-border bg-popover/95 backdrop-blur-xl"
                    onMouseLeave={() => setLangOpen(false)}
                  >
                    {langs.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          i18n.changeLanguage(l.code);
                          setLangOpen(false);
                        }}
                        className={`block w-full px-3 py-2 text-start text-xs transition-colors hover:bg-muted ${
                          i18n.language === l.code ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/book"
                className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-[0_0_20px_-4px_var(--glow)] transition-all hover:shadow-[0_0_30px_-2px_var(--glow-strong)] sm:flex"
              >
                <Phone className="h-3.5 w-3.5" />
                {t("nav.callback")}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-foreground md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
        <nav
          className={`absolute inset-x-4 top-24 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-2xl transition-transform ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Language switcher pinned at top of drawer */}
          <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-border/40 bg-background/40 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-ultra text-muted-foreground">
              <Globe className="h-3.5 w-3.5" /> Language
            </span>
            <div className="flex gap-1">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => i18n.changeLanguage(l.code)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
                    i18n.language === l.code
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  params={l.params as never}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-border/50 pt-4">
            <Link
              to="/book"
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" />
              {t("nav.callback")}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
