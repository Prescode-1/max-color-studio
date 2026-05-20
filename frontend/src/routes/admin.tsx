import { createFileRoute, Link, Outlet, useLocation, redirect } from "@tanstack/react-router";
import { LayoutDashboard, Calendar, Palette, Users, BarChart3, ImageIcon, FileText, Settings, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Max Color" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin") {
      throw redirect({ to: "/admin/overview" });
    }
  },
  component: AdminLayout,
});

const tabs = [
  { to: "/admin/overview",  label: "Overview",   Icon: LayoutDashboard },
  { to: "/admin/bookings",  label: "Bookings",   Icon: Calendar },
  { to: "/admin/catalog",   label: "Catalog",    Icon: Palette },
  { to: "/admin/customers", label: "Customers",  Icon: Users },
  { to: "/admin/analytics", label: "Analytics",  Icon: BarChart3 },
  { to: "/admin/media",     label: "Media",      Icon: ImageIcon },
  { to: "/admin/content",   label: "Content",    Icon: FileText },
  { to: "/admin/settings",  label: "Settings",   Icon: Settings },
] as const;

function AdminLayout() {
  const loc = useLocation();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-ultra text-muted-foreground">Studio Console</p>
          <h1 className="text-display text-3xl font-bold sm:text-4xl">Admin Dashboard</h1>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-muted-foreground hover:border-primary/60 hover:text-primary"
        >
          <LogOut className="h-3.5 w-3.5" />
          Exit admin
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-border/60 bg-card p-2 md:sticky md:top-24 md:self-start">
          <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
            {tabs.map(({ to, label, Icon }) => {
              const active = loc.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
