import { createFileRoute } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin-store";
import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";

export const Route = createFileRoute("/admin/media")({
  component: MediaAdmin,
});

function MediaAdmin() {
  const { media, addMedia, updateMedia, removeMedia } = useAdmin();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<{ title: string; category: "Full Body" | "Caliper" | "Wheels"; url: string }>({ title: "", category: "Full Body", url: "" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-display text-xl font-semibold">Portfolio & Media</h2>
        <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          <Plus className="h-3.5 w-3.5"/> Add media
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((m) => (
          <div key={m.id} className="group overflow-hidden rounded-2xl border border-border/60 bg-card">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {m.url ? (
                <img src={m.url} alt={m.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e)=>(e.currentTarget.style.display='none')} />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="truncate font-medium">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{m.category}</div>
                </div>
                <div className="flex gap-1">
                  <button onClick={()=>updateMedia(m.id,{featured:!m.featured})} className={m.featured ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}>
                    <Star className="h-4 w-4" fill={m.featured ? "currentColor" : "none"} />
                  </button>
                  <button onClick={()=>removeMedia(m.id)} className="text-muted-foreground hover:text-red-400"><Trash2 className="h-4 w-4"/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={()=>setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-display text-lg font-semibold">New media item</h3>
            <div className="mt-4 space-y-3 text-sm">
              <input placeholder="Title" value={draft.title} onChange={(e)=>setDraft({...draft, title:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
              <select value={draft.category} onChange={(e)=>setDraft({...draft, category:e.target.value as "Full Body"|"Caliper"|"Wheels"})} className="w-full rounded-lg border border-border bg-background px-3 py-2">
                <option>Full Body</option><option>Caliper</option><option>Wheels</option>
              </select>
              <input placeholder="Image URL" value={draft.url} onChange={(e)=>setDraft({...draft, url:e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2" />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-full border border-border px-4 py-2 text-xs">Cancel</button>
              <button onClick={()=>{ if(!draft.title) return; addMedia({ ...draft, featured:false }); setOpen(false); setDraft({ title:"", category:"Full Body", url:"" }); }} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
