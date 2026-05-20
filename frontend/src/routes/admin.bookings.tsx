import { createFileRoute } from "@tanstack/react-router";
import { useAdmin, type BookingStatus } from "@/lib/admin-store";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/bookings")({
  component: BookingsAdmin,
});

const statuses: BookingStatus[] = ["pending", "confirmed", "in-progress", "complete", "cancelled"];

const statusColor: Record<BookingStatus, string> = {
  pending:       "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  confirmed:     "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "in-progress": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  complete:      "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled:     "bg-red-500/15 text-red-400 border-red-500/30",
};

function BookingsAdmin() {
  const { bookings, addBooking, updateBooking, removeBooking } = useAdmin();
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ customer: "", email: "", phone: "", service: "Full Body Refinish", date: "", time: "10:00", notes: "" });

  const list = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["all", ...statuses] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                filter === s ? "border-primary bg-primary/15 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          <Plus className="h-3.5 w-3.5" /> New booking
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((b) => (
              <tr key={b.id} className="border-b border-border/30 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="font-medium">{b.customer}</div>
                  <div className="text-xs text-muted-foreground">{b.email}</div>
                </td>
                <td className="px-4 py-3">{b.service}</td>
                <td className="px-4 py-3 whitespace-nowrap">{b.date} • {b.time}</td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateBooking(b.id, { status: e.target.value as BookingStatus })}
                    className={`rounded-md border bg-transparent px-2 py-1 text-xs ${statusColor[b.status]}`}
                  >
                    {statuses.map((s) => <option key={s} value={s} className="bg-background text-foreground">{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => removeBooking(b.id)} className="text-muted-foreground hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">No bookings.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-display text-lg font-semibold">New booking</h3>
            <div className="mt-4 space-y-3 text-sm">
              <input placeholder="Customer name" value={draft.customer} onChange={(e)=>setDraft({...draft, customer:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <input placeholder="Email" value={draft.email} onChange={(e)=>setDraft({...draft, email:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <input placeholder="Phone" value={draft.phone} onChange={(e)=>setDraft({...draft, phone:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <select value={draft.service} onChange={(e)=>setDraft({...draft, service:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2">
                <option>Full Body Refinish</option><option>Caliper Painting</option><option>Wheel Coating</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" value={draft.date} onChange={(e)=>setDraft({...draft, date:e.target.value})} className="rounded-lg border border-border bg-background px-3 py-2" />
                <input type="time" value={draft.time} onChange={(e)=>setDraft({...draft, time:e.target.value})} className="rounded-lg border border-border bg-background px-3 py-2" />
              </div>
              <textarea placeholder="Notes" value={draft.notes} onChange={(e)=>setDraft({...draft, notes:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" rows={3} />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-full border border-border px-4 py-2 text-xs">Cancel</button>
              <button
                onClick={() => {
                  if (!draft.customer || !draft.date) return;
                  addBooking({ ...draft, status: "pending" });
                  setOpen(false);
                  setDraft({ customer: "", email: "", phone: "", service: "Full Body Refinish", date: "", time: "10:00", notes: "" });
                }}
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
