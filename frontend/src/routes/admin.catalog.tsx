import { createFileRoute } from "@tanstack/react-router";
import { useAdmin, type ServiceItem } from "@/lib/admin-store";
import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";

export const Route = createFileRoute("/admin/catalog")({
  component: CatalogAdmin,
});

function Row({ s, onSave, onRemove }: { s: ServiceItem; onSave: (patch: Partial<ServiceItem>) => void; onRemove: () => void }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState(s);
  if (edit) {
    return (
      <div className="grid grid-cols-1 gap-2 rounded-xl border border-primary/40 bg-card p-4 sm:grid-cols-[1.5fr_2fr_auto_auto_auto]">
        <input value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <input value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <input type="number" value={draft.priceFrom} onChange={(e)=>setDraft({...draft, priceFrom:Number(e.target.value)})} className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <input value={draft.duration} onChange={(e)=>setDraft({...draft, duration:e.target.value})} className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <div className="flex gap-1">
          <button onClick={()=>{onSave(draft); setEdit(false);}} className="rounded-md bg-primary px-2 py-2 text-primary-foreground"><Save className="h-3.5 w-3.5"/></button>
          <button onClick={()=>{setDraft(s); setEdit(false);}} className="rounded-md border border-border px-2 py-2"><X className="h-3.5 w-3.5"/></button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{s.title}</h4>
          <button onClick={()=>onSave({active:!s.active})} className={`rounded-full border px-2 py-0.5 text-[10px] ${s.active ? "border-green-500/40 text-green-400" : "border-border text-muted-foreground"}`}>
            {s.active ? "Active" : "Hidden"}
          </button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
        <div className="mt-1 text-xs text-muted-foreground">From <span className="text-primary">${s.priceFrom}</span> · {s.duration}</div>
      </div>
      <div className="flex gap-1">
        <button onClick={()=>setEdit(true)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-primary"><Edit2 className="h-3.5 w-3.5"/></button>
        <button onClick={onRemove} className="rounded-md border border-border p-2 text-muted-foreground hover:text-red-400"><Trash2 className="h-3.5 w-3.5"/></button>
      </div>
    </div>
  );
}

function CatalogAdmin() {
  const { services, addService, updateService, removeService } = useAdmin();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ slug: "", title: "", description: "", priceFrom: 0, duration: "" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-display text-xl font-semibold">Paint & Service Catalog</h2>
        <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          <Plus className="h-3.5 w-3.5"/> New service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((s) => (
          <Row key={s.id} s={s} onSave={(p)=>updateService(s.id, p)} onRemove={()=>removeService(s.id)} />
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={()=>setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-display text-lg font-semibold">New service</h3>
            <div className="mt-4 space-y-3 text-sm">
              <input placeholder="Slug (e.g. ceramic-coating)" value={draft.slug} onChange={(e)=>setDraft({...draft, slug:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <input placeholder="Title" value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <textarea placeholder="Description" value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" rows={3} />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Price from" value={draft.priceFrom||""} onChange={(e)=>setDraft({...draft, priceFrom:Number(e.target.value)})} className="rounded-lg border border-border bg-background px-3 py-2" />
                <input placeholder="Duration" value={draft.duration} onChange={(e)=>setDraft({...draft, duration:e.target.value})} className="rounded-lg border border-border bg-background px-3 py-2" />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-full border border-border px-4 py-2 text-xs">Cancel</button>
              <button
                onClick={()=>{ if(!draft.title) return; addService({ ...draft, active: true }); setOpen(false); setDraft({ slug:"", title:"", description:"", priceFrom:0, duration:"" }); }}
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
