import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { createClerkClient } from '@clerk/clerk-sdk-node'
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY as string })

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
      const userId = session.metadata?.userId;

      if (userId) {
        // Update Clerk user with payment information using clerkClient
        await clerkClient.users.updateUser(userId, {
          publicMetadata: {
            paid: true, // Mark the user as having paid
            paymentId: session.id, // Optionally, store the Stripe payment session ID
          },
        });
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