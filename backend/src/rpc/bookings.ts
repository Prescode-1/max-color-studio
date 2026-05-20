import { createServerFn } from "@tanstack/react-start";
import { connectToDatabase } from "../lib/mongodb";
import { Booking } from "../models/Booking";

// Define input shape for typescript
interface CreateBookingInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
}

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const data = d as CreateBookingInput;
    if (!data.name || !data.email || !data.service || !data.date) {
      throw new Error("Missing required fields");
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      await connectToDatabase();
      const newBooking = await Booking.create({
        ...data,
        date: new Date(data.date),
      });
      return { success: true, bookingId: newBooking._id.toString() };
    } catch (error: any) {
      console.error("Error creating booking:", error);
      return { error: "Failed to create booking: " + error.message };
    }
  });

export const getBookings = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      await connectToDatabase();
      // Fetch bookings, sort by newest first
      const bookings = await Booking.find({}).sort({ createdAt: -1 }).limit(50).lean();
      
      // Convert ObjectIds and Dates to strings so they can be safely passed to the frontend
      const serializedBookings = bookings.map(b => ({
        ...b,
        _id: b._id.toString(),
        date: b.date.toISOString(),
        createdAt: b.createdAt.toISOString()
      }));
      
      return { success: true, bookings: serializedBookings };
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      return { error: "Failed to fetch bookings: " + error.message };
    }
  });
