import { Command } from "cmdk";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { services, portfolio } from "@/lib/data";
import { Search, Wrench, Image, Calendar, Sparkles, Home, LayoutDashboard } from "lucide-react";

export function SearchPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]" onClick={() => onOpenChange(false)}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-primary/20 bg-popover shadow-2xl shadow-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="bg-transparent" loop>
          <div className="flex items-center gap-3 border-b border-border/50 px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Command.Input
              autoFocus
              placeholder={t("search.placeholder")}
              className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
              {t("search.empty")}
            </Command.Empty>

            <Command.Group heading="Pages" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              <Item icon={<Home className="h-4 w-4" />} onSelect={() => go("/")}>Home</Item>
              <Item icon={<Sparkles className="h-4 w-4" />} onSelect={() => go("/visualizer")}>Color Visualizer</Item>
              <Item icon={<Calendar className="h-4 w-4" />} onSelect={() => go("/book")}>Book Appointment</Item>
              <Item icon={<Image className="h-4 w-4" />} onSelect={() => go("/portfolio")}>Portfolio</Item>
              <Item icon={<LayoutDashboard className="h-4 w-4" />} onSelect={() => go("/dashboard")}>Dashboard</Item>
            </Command.Group>

            <Command.Group heading="Services" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              {services.map((s) => (
                <Item key={s.slug} icon={<Wrench className="h-4 w-4" />} onSelect={() => go(`/services/${s.slug}`)}>
                  {t(s.titleKey)}
                </Item>
              ))}
            </Command.Group>

            <Command.Group heading="Portfolio" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              {portfolio.map((p) => (
                <Item key={p.id} icon={<Image className="h-4 w-4" />} onSelect={() => go("/portfolio")}>
                  {p.title} <span className="ms-2 text-xs text-muted-foreground">— {p.category}</span>
                </Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({ icon, children, onSelect }: { icon: React.ReactNode; children: React.ReactNode; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground aria-selected:bg-primary/15 aria-selected:text-primary"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1">{children}</span>
    </Command.Item>
  );
}
