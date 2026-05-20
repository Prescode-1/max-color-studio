import { create } from "zustand";
import { fetchAllAdminData, saveEntity, saveSettings } from "@backend/rpc/api";

export type BookingStatus = "pending" | "confirmed" | "in-progress" | "complete" | "cancelled";

export type Booking = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  notes?: string;
};

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceFrom: number;
  duration: string;
  active: boolean;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  visits: number;
  vip: boolean;
};

export type MediaItem = {
  id: string;
  title: string;
  category: "Full Body" | "Caliper" | "Wheels";
  url: string;
  featured: boolean;
};

export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  brandTitle: string;
  brandBody: string;
  servicesTitle: string;
  servicesSubtitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  ctaTitle: string;
  ctaBody: string;
  visualizerTitle: string;
  visualizerSubtitle: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  bookingTitle: string;
  bookingSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  contactBody: string;
};

export type Branding = {
  brandPrefix: string;
  brandSuffix: string;
  tagline: string;
  phoneDisplay: string;
  phoneUrl: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  mapEmbedUrl: string;
  workingHours: string;
  twitterUrl: string;
  twitterHandle: string;
  instagramUrl: string;
  instagramHandle: string;
  facebookUrl: string;
  facebookHandle: string;
  tiktokUrl: string;
  tiktokHandle: string;
  timezone: string;
  bookingLeadDays: number;
  notifyEmail: boolean;
  notifySms: boolean;
};

const DEFAULT_CONTENT: SiteContent = {
  heroEyebrow: "PREMIUM AUTOMOTIVE PAINTING",
  heroTitle: "Painted with precision. Finished with obsession.",
  heroSubtitle: "Max Color delivers showroom-grade paintwork — full body, calipers, wheels — engineered for collectors and tuners who refuse compromise.",
  brandTitle: "Color is our craft",
  brandBody: "Twenty years inside the booth. Aerospace-grade primers, ceramic clear coats, and a colorimetry lab that matches any pigment on earth.",
  servicesTitle: "Types of Car Painting",
  servicesSubtitle: "Seven disciplines. One uncompromising standard.",
  featuresTitle: "We can do what others can't",
  featuresSubtitle: "Capabilities that set our booth apart.",
  ctaTitle: "Ready to paint your dream?",
  ctaBody: "Book a free consultation. We'll quote, plan, and deliver.",
  visualizerTitle: "AI Color Visualizer",
  visualizerSubtitle: "Pick a vehicle. Apply Max Color. See it instantly.",
  portfolioTitle: "Portfolio",
  portfolioSubtitle: "Selected work from the booth.",
  bookingTitle: "Book your slot",
  bookingSubtitle: "Real-time workshop availability.",
  contactTitle: "Visit the studio",
  contactSubtitle: "Walk-ins welcome. Consultations are always free.",
  contactBody: "Stop by the booth, give us a call, or send a quick message — our color desk replies within the hour during studio hours.",
};

const DEFAULT_BRANDING: Branding = {
  brandPrefix: "MAX",
  brandSuffix: "COLOR",
  tagline: "Premium automotive painting since 2004.",
  phoneDisplay: "+1 (415) 555-0184",
  phoneUrl: "tel:+14155550184",
  email: "hello@maxcolor.studio",
  addressLine1: "1842 Refinery Avenue",
  addressLine2: "Bay 7, Industrial District",
  city: "San Francisco, CA 94124",
  country: "United States",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.74!2d-122.41!3d37.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ0JzI0LjAiTiAxMjLCsDI0JzM2LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000",
  workingHours: "Mon–Sat · 09:00–19:00",
  twitterUrl: "https://twitter.com/maxcolor",
  twitterHandle: "@maxcolor",
  instagramUrl: "https://instagram.com/maxcolor",
  instagramHandle: "@maxcolor",
  facebookUrl: "https://facebook.com/maxcolor",
  facebookHandle: "/maxcolor",
  tiktokUrl: "https://tiktok.com/@maxcolor",
  tiktokHandle: "@maxcolor",
  timezone: "America/Los_Angeles",
  bookingLeadDays: 2,
  notifyEmail: true,
  notifySms: false,
};

type AdminState = {
  isLoaded: boolean;
  bookings: Booking[];
  services: ServiceItem[];
  customers: Customer[];
  media: MediaItem[];
  content: SiteContent;
  branding: Branding;

  init: () => Promise<void>;

  addBooking: (b: Omit<Booking, "id">) => Promise<void>;
  updateBooking: (id: string, patch: Partial<Booking>) => Promise<void>;
  removeBooking: (id: string) => Promise<void>;

  addService: (s: Omit<ServiceItem, "id">) => Promise<void>;
  updateService: (id: string, patch: Partial<ServiceItem>) => Promise<void>;
  removeService: (id: string) => Promise<void>;

  addCustomer: (c: Omit<Customer, "id">) => Promise<void>;
  updateCustomer: (id: string, patch: Partial<Customer>) => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;

  addMedia: (m: Omit<MediaItem, "id">) => Promise<void>;
  updateMedia: (id: string, patch: Partial<MediaItem>) => Promise<void>;
  removeMedia: (id: string) => Promise<void>;

  updateContent: (patch: Partial<SiteContent>) => Promise<void>;
  updateBranding: (patch: Partial<Branding>) => Promise<void>;
};

export const useAdmin = create<AdminState>((set, get) => ({
  isLoaded: false,
  bookings: [],
  services: [],
  customers: [],
  media: [],
  content: DEFAULT_CONTENT,
  branding: DEFAULT_BRANDING,

  init: async () => {
    if (get().isLoaded) return;
    try {
      const res = await fetchAllAdminData();
      if (res.success && res.data) {
        set({
          isLoaded: true,
          bookings: res.data.bookings || [],
          services: res.data.services || [],
          customers: res.data.customers || [],
          media: res.data.media || [],
          content: Object.keys(res.data.content || {}).length ? res.data.content : DEFAULT_CONTENT,
          branding: Object.keys(res.data.branding || {}).length ? res.data.branding : DEFAULT_BRANDING,
        });
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  },

  addBooking: async (b) => {
    const res = await saveEntity({ data: { collection: "bookings", action: "add", data: b } });
    if (res.success && res.doc) set((s) => ({ bookings: [res.doc as Booking, ...s.bookings] }));
  },
  updateBooking: async (id, patch) => {
    const res = await saveEntity({ data: { collection: "bookings", action: "update", id, data: patch } });
    if (res.success && res.doc) set((s) => ({ bookings: s.bookings.map((b) => (b.id === id ? (res.doc as Booking) : b)) }));
  },
  removeBooking: async (id) => {
    await saveEntity({ data: { collection: "bookings", action: "remove", id } });
    set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) }));
  },

  addService: async (x) => {
    const res = await saveEntity({ data: { collection: "services", action: "add", data: x } });
    if (res.success && res.doc) set((s) => ({ services: [res.doc as ServiceItem, ...s.services] }));
  },
  updateService: async (id, patch) => {
    const res = await saveEntity({ data: { collection: "services", action: "update", id, data: patch } });
    if (res.success && res.doc) set((s) => ({ services: s.services.map((x) => (x.id === id ? (res.doc as ServiceItem) : x)) }));
  },
  removeService: async (id) => {
    await saveEntity({ data: { collection: "services", action: "remove", id } });
    set((s) => ({ services: s.services.filter((x) => x.id !== id) }));
  },

  addCustomer: async (c) => {
    const res = await saveEntity({ data: { collection: "customers", action: "add", data: c } });
    if (res.success && res.doc) set((s) => ({ customers: [res.doc as Customer, ...s.customers] }));
  },
  updateCustomer: async (id, patch) => {
    const res = await saveEntity({ data: { collection: "customers", action: "update", id, data: patch } });
    if (res.success && res.doc) set((s) => ({ customers: s.customers.map((c) => (c.id === id ? (res.doc as Customer) : c)) }));
  },
  removeCustomer: async (id) => {
    await saveEntity({ data: { collection: "customers", action: "remove", id } });
    set((s) => ({ customers: s.customers.filter((c) => c.id !== id) }));
  },

  addMedia: async (m) => {
    const res = await saveEntity({ data: { collection: "media", action: "add", data: m } });
    if (res.success && res.doc) set((s) => ({ media: [res.doc as MediaItem, ...s.media] }));
  },
  updateMedia: async (id, patch) => {
    const res = await saveEntity({ data: { collection: "media", action: "update", id, data: patch } });
    if (res.success && res.doc) set((s) => ({ media: s.media.map((m) => (m.id === id ? (res.doc as MediaItem) : m)) }));
  },
  removeMedia: async (id) => {
    await saveEntity({ data: { collection: "media", action: "remove", id } });
    set((s) => ({ media: s.media.filter((m) => m.id !== id) }));
  },

  updateContent: async (patch) => {
    const newContent = { ...get().content, ...patch };
    set({ content: newContent });
    await saveSettings({ data: { type: "content", data: newContent } });
  },
  updateBranding: async (patch) => {
    const newBranding = { ...get().branding, ...patch };
    set({ branding: newBranding });
    await saveSettings({ data: { type: "branding", data: newBranding } });
  },
}));
