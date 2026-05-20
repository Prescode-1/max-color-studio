// Hook-style accessor that pulls live values from the admin store.
// Use `useSocial()` inside React components to get reactive values that
// update when the admin edits branding in the dashboard.
import { useAdmin } from "@/lib/admin-store";

export type SocialMap = {
  twitter:   { url: string; handle: string };
  instagram: { url: string; handle: string };
  facebook:  { url: string; handle: string };
  tiktok:    { url: string; handle: string };
  phone:     { url: string; display: string };
  email:     { url: string; display: string };
};

const FALLBACK = {
  twitterUrl: "#", twitterHandle: "@maxcolor",
  instagramUrl: "#", instagramHandle: "@maxcolor",
  facebookUrl: "#", facebookHandle: "/maxcolor",
  tiktokUrl: "#", tiktokHandle: "@maxcolor",
  phoneUrl: "#", phoneDisplay: "+1 (415) 555-0184",
  email: "hello@maxcolor.studio",
};

export function useSocial(): SocialMap {
  const b = useAdmin((s) => s.branding) ?? FALLBACK;
  return {
    twitter:   { url: b.twitterUrl,   handle: b.twitterHandle },
    instagram: { url: b.instagramUrl, handle: b.instagramHandle },
    facebook:  { url: b.facebookUrl,  handle: b.facebookHandle },
    tiktok:    { url: b.tiktokUrl,    handle: b.tiktokHandle },
    phone:     { url: b.phoneUrl,     display: b.phoneDisplay },
    email:     { url: `mailto:${b.email}`, display: b.email },
  };
}
