import { createFileRoute } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-store";
import { Calendar, DollarSign, Users, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/overview")({
  component: Overview,
});

function Stat({ label, value, Icon, trend }: { label: string; value: string; Icon: typeof Calendar; trend?: string }) {
  return (
    <div className="card-hover relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
      <div className="absolute -right-8 -top-8 h-24 w-24 glow-blue opacity-40" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-ultra text-muted-foreground">{label}</div>
          <div className="text-display text-2xl font-bold">{value}</div>
          {trend && <div className="text-[10px] text-primary">{trend}</div>}
        </div>
      </div>
    </div>
  );
}

function Overview() {
  const { bookings, customers, services } = useAdmin();
  const revenue = customers.reduce((s, c) => s + c.totalSpend, 0);
  const completed = bookings.filter((b) => b.status === "complete").length;
  const upcoming = bookings.filter((b) => b.status === "confirmed" || b.status === "pending").slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Bookings" value={String(bookings.length)} Icon={Calendar} trend="+12% MoM" />
        <Stat label="Revenue" value={`$${revenue.toLocaleString()}`} Icon={DollarSign} trend="+8% MoM" />
        <Stat label="Customers" value={String(customers.length)} Icon={Users} trend={`${customers.filter(c=>c.vip).length} VIP`} />
        <Stat label="Completed" value={String(completed)} Icon={CheckCircle2} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="text-display text-lg font-semibold">Upcoming bookings</h3>
          <div className="mt-3 divide-y divide-border/50">
            {upcoming.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <div className="font-medium">{b.customer}</div>
                  <div className="text-xs text-muted-foreground">{b.service}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{b.date}</div>
                  <div className="text-xs text-muted-foreground">{b.time}</div>
                </div>
              </div>
            ))}
            {upcoming.length === 0 && <div className="py-6 text-center text-sm text-muted-foreground">No upcoming bookings.</div>}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="text-display text-lg font-semibold">Active services</h3>
          <div className="mt-3 space-y-2">
            {services.filter(s=>s.active).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-border/40 px-3 py-2 text-sm">
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.duration}</div>
                </div>
                <div className="text-primary">${s.priceFrom.toLocaleString()}+</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
