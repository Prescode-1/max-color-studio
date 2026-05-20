import { createFileRoute } from "@tanstack/react-router";
import { useAdmin, type Branding } from "@/lib/admin-store";
import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

type Section = {
  title: string;
  fields: { key: keyof Branding; label: string; type?: "text" | "number" | "checkbox" | "url" | "textarea" }[];
};

const sections: Section[] = [
  {
    title: "Identity & Logo",
    fields: [
      { key: "brandPrefix", label: "Logo prefix" },
      { key: "brandSuffix", label: "Logo suffix (highlighted)" },
      { key: "tagline", label: "Tagline (footer)" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "phoneDisplay", label: "Phone (display)" },
      { key: "phoneUrl", label: "Phone (tel: link)", type: "url" },
      { key: "email", label: "Email" },
    ],
  },
  {
    title: "Address",
    fields: [
      { key: "addressLine1", label: "Address line 1" },
      { key: "addressLine2", label: "Address line 2" },
      { key: "city", label: "City / Region / Postal" },
      { key: "country", label: "Country" },
      { key: "mapEmbedUrl", label: "Google Maps embed URL", type: "textarea" },
      { key: "workingHours", label: "Working hours" },
    ],
  },
  {
    title: "Social handles",
    fields: [
      { key: "twitterUrl", label: "Twitter URL", type: "url" },
      { key: "twitterHandle", label: "Twitter handle" },
      { key: "instagramUrl", label: "Instagram URL", type: "url" },
      { key: "instagramHandle", label: "Instagram handle" },
      { key: "facebookUrl", label: "Facebook URL", type: "url" },
      { key: "facebookHandle", label: "Facebook handle" },
      { key: "tiktokUrl", label: "TikTok URL", type: "url" },
      { key: "tiktokHandle", label: "TikTok handle" },
    ],
  },
  {
    title: "Studio operations",
    fields: [
      { key: "timezone", label: "Timezone" },
      { key: "bookingLeadDays", label: "Booking lead days", type: "number" },
      { key: "notifyEmail", label: "Email notifications for new bookings", type: "checkbox" },
      { key: "notifySms", label: "SMS notifications for new bookings", type: "checkbox" },
    ],
  },
];

function SettingsAdmin() {
  const { branding, updateBranding } = useAdmin();
  const [draft, setDraft] = useState<Branding>(branding);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(branding), [branding]);

  const save = () => {
    updateBranding(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-display text-xl font-semibold">Branding & Studio Settings</h2>
          <p className="text-xs text-muted-foreground">Edit your logo, contact info, address, socials, and operational defaults — applied across the entire site.</p>
        </div>
        <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      {sections.map((sec) => (
        <div key={sec.title} className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="text-display text-sm font-semibold">{sec.title}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {sec.fields.map((f) => (
              <FieldEditor
                key={String(f.key)}
                label={f.label}
                type={f.type}
                value={draft[f.key]}
                onChange={(v) => setDraft({ ...draft, [f.key]: v } as Branding)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm text-yellow-200">
        <strong>Mock mode:</strong> Settings reset on reload. Enable Lovable Cloud to persist these values, gate this route behind admin auth, and broadcast bookings to email/SMS.
      </div>
    </div>
  );
}

function FieldEditor({
  label, type, value, onChange,
}: {
  label: string;
  type?: "text" | "number" | "checkbox" | "url" | "textarea";
  value: string | number | boolean;
  onChange: (v: string | number | boolean) => void;
}) {
  if (type === "checkbox") {
    return (
      <label className="col-span-full flex items-center gap-2 text-sm">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    );
  }
  if (type === "textarea") {
    return (
      <div className="col-span-full">
        <label className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">{label}</label>
        <textarea
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono"
        />
      </div>
    );
  }
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-ultra text-muted-foreground">{label}</label>
      <input
        type={type === "number" ? "number" : "text"}
        value={String(value)}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      />
    </div>
  );
}
