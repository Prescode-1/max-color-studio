import { createFileRoute } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-store";
import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersAdmin,
});

function CustomersAdmin() {
  const { customers, addCustomer, updateCustomer, removeCustomer } = useAdmin();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ name: "", email: "", phone: "", totalSpend: 0, visits: 0, vip: false });

  const list = customers.filter((c) =>
    [c.name, c.email, c.phone].some((v) => v.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          placeholder="Search customers…"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          <Plus className="h-3.5 w-3.5"/> New customer
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Visits</th>
              <th className="px-4 py-3">Total spend</th>
              <th className="px-4 py-3">VIP</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b border-border/30 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{c.email}<br/>{c.phone}</td>
                <td className="px-4 py-3">{c.visits}</td>
                <td className="px-4 py-3 text-primary">${c.totalSpend.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button onClick={()=>updateCustomer(c.id,{vip:!c.vip})} className={c.vip ? "text-yellow-400" : "text-muted-foreground"}>
                    <Star className="h-4 w-4" fill={c.vip ? "currentColor" : "none"} />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={()=>removeCustomer(c.id)} className="text-muted-foreground hover:text-red-400"><Trash2 className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">No matches.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={()=>setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-display text-lg font-semibold">New customer</h3>
            <div className="mt-4 space-y-3 text-sm">
              <input placeholder="Name" value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <input placeholder="Email" value={draft.email} onChange={(e)=>setDraft({...draft, email:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <input placeholder="Phone" value={draft.phone} onChange={(e)=>setDraft({...draft, phone:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <label className="flex items-center gap-2"><input type="checkbox" checked={draft.vip} onChange={(e)=>setDraft({...draft, vip:e.target.checked})}/> VIP</label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-full border border-border px-4 py-2 text-xs">Cancel</button>
              <button onClick={()=>{ if(!draft.name) return; addCustomer(draft); setOpen(false); setDraft({ name:"",email:"",phone:"",totalSpend:0,visits:0,vip:false }); }} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
