import { useEffect, useRef, useState } from "react";
import { Share2, X, Twitter, Instagram, Facebook, Phone, Mail } from "lucide-react";
import { useSocial } from "@/lib/social";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3a5.5 5.5 0 0 0 5 5v3a8.5 8.5 0 0 1-5-1.6V15a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 2.8 2.8V3h3.2Z" />
    </svg>
  );
}

export function SocialFab() {
  const social = useSocial();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const items = [
    { Icon: Twitter,    label: "Twitter",   value: social.twitter.handle,   href: social.twitter.url },
    { Icon: Instagram,  label: "Instagram", value: social.instagram.handle, href: social.instagram.url },
    { Icon: Facebook,   label: "Facebook",  value: social.facebook.handle,  href: social.facebook.url },
    { Icon: TikTokIcon, label: "TikTok",    value: social.tiktok.handle,    href: social.tiktok.url },
    { Icon: Phone,      label: "Call",      value: social.phone.display,    href: social.phone.url },
    { Icon: Mail,       label: "Email",     value: social.email.display,    href: social.email.url },
  ];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-24 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close socials" : "Open socials"}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-border/60 bg-card/95 text-foreground shadow-[0_0_20px_-4px_var(--glow)] backdrop-blur-xl transition-all hover:scale-110 hover:border-primary/60 hover:text-primary"
      >
        {open ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
      </button>

      <div
        className={`absolute bottom-16 right-0 w-64 origin-bottom-right transition-all ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-2 shadow-2xl backdrop-blur-xl">
          <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-ultra text-muted-foreground">
            Connect with us
          </div>
          <ul className="space-y-0.5">
            {items.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs text-muted-foreground">{label}</span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
