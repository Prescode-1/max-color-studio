import mongoose, { Schema, Document } from "mongoose";

// --- Service ---
export interface IService extends Document {
  slug: string;
  title: string;
  description: string;
  priceFrom: number;
  duration: string;
  active: boolean;
}
const ServiceSchema = new Schema<IService>({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  priceFrom: { type: Number, default: 0 },
  duration: { type: String },
  active: { type: Boolean, default: true },
});
export const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

// --- Customer ---
export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  visits: number;
  vip: boolean;
}
const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  totalSpend: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  vip: { type: Boolean, default: false },
});
export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);

// --- Media ---
export interface IMedia extends Document {
  title: string;
  category: string;
  url: string;
  featured: boolean;
}
const MediaSchema = new Schema<IMedia>({
  title: { type: String },
  category: { type: String },
  url: { type: String, required: true },
  featured: { type: Boolean, default: false },
});
export const Media = mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

// --- Settings (Singleton) ---
export interface ISettings extends Document {
  type: string;
  content: Record<string, any>;
  branding: Record<string, any>;
}
const SettingsSchema = new Schema<ISettings>({
  type: { type: String, required: true, default: "global" },
  content: { type: Object, default: {} },
  branding: { type: Object, default: {} },
});
export const Settings = mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
