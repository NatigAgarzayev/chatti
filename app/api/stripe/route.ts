import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    console.log("userId = ", userId)
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: "price_1Q6CYqHP9wN4meCvzklGUQbx",
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: 'https://chatti-jade.vercel.app/dashboard/habits',
        // success_url: 'http://localhost:3000/dashboard/habits',
        cancel_url: 'https://chatti-jade.vercel.app/dashboard/habits',
        // cancel_url: 'http://localhost:3000/dashboard/habits',
        metadata: {
          userId: userId,
          priceId: "price_1Q6CYqHP9wN4meCvzklGUQbx",
        }
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}