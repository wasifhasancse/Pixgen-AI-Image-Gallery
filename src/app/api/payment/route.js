import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const PRICE_ID = process.env.STRIPE_SELLER_PRO_PRICE_ID;
    const userSession = await auth.api.getSession({ headers: await headers() });
    const user = userSession?.user;
    // Create Checkout Sessions from body params.
    // const price = await stripe.prices.retrieve(PRICE_ID);
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id,
        userEmail: user?.email,
        priceId: PRICE_ID,
      },
      mode: "subscription", // Use "payment" for one-time payments
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Payment API is working!" });
}
