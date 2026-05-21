import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { items } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items in cart", { status: 400 });
    }

    // Calculate total
    let total = 0;
    for (const item of items) {
      const product = await db.product.findUnique({
        where: { id: item.id },
      });
      if (product) {
        total += product.price * item.quantity;
      }
    }

    if (total === 0) {
      return new NextResponse("Invalid total", { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      metadata: {
        userId: session.user.id as string,
        productIds: JSON.stringify(items.map((i: any) => i.id)),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("[PAYMENT_INTENT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
