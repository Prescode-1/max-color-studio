import { createServerFn } from "@tanstack/react-start";
import { connectToDatabase } from "../lib/mongodb";
import { Service, Customer, Media, Settings } from "../models/Models";
import { Booking } from "../models/Booking";

// Helper for generic serialization
const serialize = (doc: any) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  if (obj.createdAt) obj.createdAt = obj.createdAt.toISOString();
  if (obj.date) obj.date = obj.date.toISOString();
  return obj;
};

// --- INITIAL LOAD ---
// Gets all data for the admin store
export const fetchAllAdminData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      await connectToDatabase();
      const bookings = await Booking.find().sort({ createdAt: -1 });
      const services = await Service.find();
      const customers = await Customer.find();
      const media = await Media.find();
      let settings = await Settings.findOne({ type: "global" });

      return {
        success: true,
        data: {
          bookings: bookings.map(serialize),
          services: services.map(serialize),
          customers: customers.map(serialize),
          media: media.map(serialize),
          content: settings?.content || null,
          branding: settings?.branding || null,
        }
      };
    } catch (e: any) {
      return { error: e.message };
    }
  });

// --- UPDATES ---
export const saveEntity = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d as { collection: string; action: "add" | "update" | "remove"; id?: string; data?: any })
  .handler(async ({ data: { collection, action, id, data } }) => {
    await connectToDatabase();
    
    let Model: any;
    switch (collection) {
      case "bookings": Model = Booking; break;
      case "services": Model = Service; break;
      case "customers": Model = Customer; break;
      case "media": Model = Media; break;
      default: return { error: "Unknown collection" };
    }

    try {
      if (action === "add") {
        const doc = await Model.create(data);
        return { success: true, doc: serialize(doc) };
      } else if (action === "update") {
        const doc = await Model.findByIdAndUpdate(id, data, { new: true });
        return { success: true, doc: serialize(doc) };
      } else if (action === "remove") {
        await Model.findByIdAndDelete(id);
        return { success: true };
      }
      return { error: "Invalid action" };
    } catch (e: any) {
      return { error: e.message };
    }
  });

// --- SETTINGS ---
export const saveSettings = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d as { type: "content" | "branding"; data: any })
  .handler(async ({ data: { type, data } }) => {
    await connectToDatabase();
    try {
      const updateObj = type === "content" ? { content: data } : { branding: data };
      await Settings.findOneAndUpdate({ type: "global" }, updateObj, { upsert: true, new: true });
      return { success: true };
    } catch (e: any) {
      return { error: e.message };
    }
  });
