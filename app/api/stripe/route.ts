import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: "price_1Q6APGHP9wN4meCvIjuZ7YHo",
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: `https://chatti-jade.vercel.app/dashboard/habits`,
        cancel_url: `https://chatti-jade.vercel.app/dashboard/habits`,
        metadata: {
        //   userId: userId,
          priceId: "price_1Q6APGHP9wN4meCvIjuZ7YHo",
        }
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}