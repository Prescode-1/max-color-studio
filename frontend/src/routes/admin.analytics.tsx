import { createFileRoute } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-store";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: Analytics,
});

const monthlyRevenue = [
  { m: "Nov", revenue: 18400 }, { m: "Dec", revenue: 22100 }, { m: "Jan", revenue: 19800 },
  { m: "Feb", revenue: 24600 }, { m: "Mar", revenue: 28900 }, { m: "Apr", revenue: 31200 },
];
const trafficSources = [
  { name: "Organic", value: 42 },
  { name: "Referral", value: 21 },
  { name: "Social",   value: 27 },
  { name: "Direct",   value: 10 },
];
const colors = ["#2563EB", "#a855f7", "#22c55e", "#f59e0b"];

function Analytics() {
  const { bookings, services } = useAdmin();
  const byService = services.map((s) => ({
    name: s.title.split(" ")[0],
    bookings: bookings.filter((b) => b.service.toLowerCase().includes(s.title.split(" ")[0].toLowerCase())).length,
  }));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="text-display text-lg font-semibold">Revenue (6 months)</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} dot={{ fill: "#2563EB" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="text-display text-lg font-semibold">Bookings by service</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byService}>
                <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="bookings" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5 lg:col-span-2">
          <h3 className="text-display text-lg font-semibold">Traffic sources</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficSources} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                  {trafficSources.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
