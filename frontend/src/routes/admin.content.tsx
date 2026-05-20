import { createFileRoute } from "@tanstack/react-router";
import { useAdmin, type SiteContent } from "@/lib/admin-store";
import { useState, useEffect } from "react";
import { Save, Check } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: ContentAdmin,
});

type Group = {
  title: string;
  fields: { key: keyof SiteContent; label: string; multiline?: boolean }[];
};

const groups: Group[] = [
  {
    title: "Homepage — Hero",
    fields: [
      { key: "heroEyebrow", label: "Eyebrow tag" },
      { key: "heroTitle", label: "Hero title" },
      { key: "heroSubtitle", label: "Hero subtitle", multiline: true },
    ],
  },
  {
    title: "Homepage — Brand intro",
    fields: [
      { key: "brandTitle", label: "Brand intro title" },
      { key: "brandBody", label: "Brand intro body", multiline: true },
    ],
  },
  {
    title: "Homepage — Section headings",
    fields: [
      { key: "servicesTitle", label: "Services section title" },
      { key: "servicesSubtitle", label: "Services section subtitle" },
      { key: "featuresTitle", label: "Features section title" },
      { key: "featuresSubtitle", label: "Features section subtitle" },
    ],
  },
  {
    title: "Homepage — Footer CTA",
    fields: [
      { key: "ctaTitle", label: "CTA title" },
      { key: "ctaBody", label: "CTA body", multiline: true },
    ],
  },
  {
    title: "Visualizer page",
    fields: [
      { key: "visualizerTitle", label: "Visualizer title" },
      { key: "visualizerSubtitle", label: "Visualizer subtitle", multiline: true },
    ],
  },
  {
    title: "Portfolio page",
    fields: [
      { key: "portfolioTitle", label: "Portfolio title" },
      { key: "portfolioSubtitle", label: "Portfolio subtitle", multiline: true },
    ],
  },
  {
    title: "Booking page",
    fields: [
      { key: "bookingTitle", label: "Booking title" },
      { key: "bookingSubtitle", label: "Booking subtitle", multiline: true },
    ],
  },
  {
    title: "Contact page",
    fields: [
      { key: "contactTitle", label: "Contact title" },
      { key: "contactSubtitle", label: "Contact subtitle", multiline: true },
      { key: "contactBody", label: "Contact body", multiline: true },
    ],
  },
];

function ContentAdmin() {
  const { content, updateContent } = useAdmin();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(content), [content]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-display text-xl font-semibold">Page Content</h2>
          <p className="text-xs text-muted-foreground">Edit copy that appears on each public page. Logo / phone / email / address live in <strong>Settings</strong>.</p>
        </div>
        <button
          onClick={() => { updateContent(draft); setSaved(true); setTimeout(() => setSaved(false), 1800); }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      {groups.map((g) => (
        <div key={g.title} className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="text-display text-sm font-semibold">{g.title}</h3>
          <div className="mt-4 space-y-4">
            {g.fields.map(({ key, label, multiline }) => (
              <div key={key}>
                <label className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">{label}</label>
                {multiline ? (
                  <textarea
                    value={draft[key]}
                    onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                    rows={3}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                ) : (
                  <input
                    value={draft[key]}
                    onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
