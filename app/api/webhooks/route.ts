import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// You no longer export "handler"; export the HTTP method directly
export async function POST(request: NextRequest) {
  try {
    const buf = await request.text(); // Get the raw body
    const sig = request.headers.get('stripe-signature') as string;

    // Construct the event with Stripe's signature
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle the event (for example, checkout.session.completed)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`Payment was successful for session ID: ${session.id}`);
      // Process the session or update your database here.
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
