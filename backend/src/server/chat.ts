import { createServerFn } from "@tanstack/react-start";

const SYSTEM_PROMPT = `You are the AI assistant for Maxcolor, a premium automotive painting and detailing platform.

About Maxcolor:
- We deliver showroom-grade automotive paint work and high-end detailing for collectors, tuners, and daily drivers.
- Core services: Full Body Paint, Caliper Painting, Wheel Refinish, Ceramic Coating, Paint Protection Film (PPF), and full Detailing.
- Signature finishes include Stealth Black, Electric Blue, Pearl White, Candy Red, Bronze, and Acid Lime.
- Site features: a Color Visualizer (preview different car bodies in any finish), Portfolio of past builds, online Booking, Services pages, and a customer Dashboard.

Your role:
- Answer questions about Maxcolor, its services, paint finishes, detailing options, and any related automotive painting concepts (e.g. clear coat, base coat, candy paint, ceramic vs. wax, color sanding, cut & buff).
- Explain technical terms in simple, engaging language.
- When users ask about services, guide them to the right page (Visualizer for color preview, /services for catalog, /book for appointments, /portfolio for past work).
- Keep answers concise, sharp, and customer-friendly while maintaining a professional tone.
- If you don't know a specific price or schedule, say so and direct them to /book or to call the studio.
- Never invent policies, warranties, or prices that weren't given in this prompt — defer to booking instead.`;

export const chat = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const data = d as { messages?: Array<{ role: string; content: string }> };
    if (!Array.isArray(data?.messages)) throw new Error("messages required");
    return { messages: data.messages };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { error: "AI assistant is not configured." };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (res.status === 429) {
      return { error: "Too many requests right now — please try again in a minute." };
    }
    if (res.status === 402) {
      return { error: "AI credits exhausted. Please contact support." };
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("AI gateway error", res.status, text);
      return { error: "Sorry, the assistant is unavailable right now." };
    }

    const json = await res.json();
    const reply: string =
      json?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return { reply };
  });
