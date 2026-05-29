import { createFileRoute } from "@tanstack/react-router";

// Safaricom posts the STK result here. We log it; future work persists to DB.
export const Route = createFileRoute("/api/public/mpesa-callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          console.log("[mpesa-callback]", JSON.stringify(body));
        } catch (err) {
          console.error("[mpesa-callback] parse error", err);
        }
        // Safaricom expects a JSON ack
        return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
      },
    },
  },
});
