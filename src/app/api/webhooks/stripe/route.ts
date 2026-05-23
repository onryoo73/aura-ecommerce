import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

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

    const { data: order } = await supabase
      .from("orders")
      .insert({
        userId,
        total: session.amount,
        status: "PAID",
      })
      .select("id")
      .single();

    if (order) {
      for (const productId of productIds) {
        await supabase.from("order_items").insert({
          orderId: order.id,
          productId,
          quantity: 1,
          price: 0,
        });

        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", productId)
          .single();
        if (product) {
          await supabase
            .from("products")
            .update({ stock: product.stock - 1 })
            .eq("id", productId);
        }
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
