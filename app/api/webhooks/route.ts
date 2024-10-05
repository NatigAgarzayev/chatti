import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const buf = await request.text(); // Get the raw body
    const sig = request.headers.get('stripe-signature') as string;

    // Construct the event with Stripe's signature
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle the event (for example, checkout.session.completed)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Payment was successful for session ID: ${session.id}`);
      // Process the session or update your database here.
      const userId = session.metadata?.userId || 'user_2kbeVlEvHUAj35OGinSns4FktxF';

      console.log(`User ID: ${userId}`);

      if (userId) {
        await clerkClient.users.updateUserMetadata(userId, {
          publicMetadata: {
            paid: true, 
            paymentId: session.id,
          },
        })
      } else {
        console.error('User ID not found in session metadata');
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}