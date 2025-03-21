import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();
    if (!priceId) return new Response("Missing priceId", { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
      customer_email: "guest@example.com", // Placeholder email for guests
      subscription_data: {
        metadata: { userID: "guest_user" },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error);
    return new Response("Failed to create checkout session", { status: 500 });
  }
}
