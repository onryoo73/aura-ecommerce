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
    const itemsMeta = JSON.parse(session.metadata.items || "[]");

    const { data: order } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total: session.amount,
        status: "PAID",
      })
      .select("id")
      .single();

    if (order) {
      for (const item of itemsMeta) {
        const { data: product } = await supabase
          .from("products")
          .select("price, stock")
          .eq("id", item.id)
          .single();

        await supabase.from("order_items").insert({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          price: product?.price || 0,
        });

        if (product) {
          await supabase
            .from("products")
            .update({ stock: Math.max(0, (product.stock || 0) - item.quantity) })
            .eq("id", item.id);
        }
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
