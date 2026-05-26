import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items } = await req.json()
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 })
    }

    let total = 0
    const itemDetails: { id: string; quantity: number; price: number }[] = []

    for (const item of items) {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("price, stock")
        .eq("id", item.id)
        .maybeSingle()
      if (productError) {
        return NextResponse.json({ error: `Product lookup error: ${productError.message}` }, { status: 500 })
      }
      if (product) {
        total += product.price * item.quantity
        itemDetails.push({ id: item.id, quantity: item.quantity, price: product.price })
      }
    }

    if (total === 0) {
      return NextResponse.json({ error: "Invalid total - no valid products found" }, { status: 400 })
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: session.user.id,
        total,
        status: "PAID",
      })
      .select("id")
      .maybeSingle()

    if (orderError || !order) {
      return NextResponse.json({ error: `Order insert error: ${orderError?.message || "unknown"}` }, { status: 500 })
    }

    for (const item of itemDetails) {
      const { data: product, error: stockError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .maybeSingle()

      const { error: insertError } = await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })

      if (insertError) {
        return NextResponse.json({ error: `Order item insert error: ${insertError.message}` }, { status: 500 })
      }

      if (product && !stockError) {
        await supabase
          .from("products")
          .update({ stock: Math.max(0, (product.stock || 0) - item.quantity) })
          .eq("id", item.id)
      }
    }

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error("[CREATE_ORDER_ERROR]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
