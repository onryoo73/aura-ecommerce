import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === "payment_intent.succeeded") {
    const userId = session.metadata.userId;
    const productIds = JSON.parse(session.metadata.productIds);

    // Get cart items from metadata (simplified here)
    // In a real app, you'd probably pass more detailed info or fetch from a temp storage
    
    // Create order
    const order = await db.order.create({
      data: {
        userId,
        total: session.amount,
        status: "PAID",
        items: {
          create: productIds.map((productId: string) => ({
            productId,
            quantity: 1, // simplified
            price: 0, // should be real price
          })),
        },
      },
    });

    // Reduce stock
    for (const productId of productIds) {
      await db.product.update({
        where: { id: productId },
        data: { stock: { decrement: 1 } },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
