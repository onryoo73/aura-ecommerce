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
      const { data: product } = await supabase
        .from("products")
        .select("price, stock")
        .eq("id", item.id)
        .single()
      if (product) {
        total += product.price * item.quantity
        itemDetails.push({ id: item.id, quantity: item.quantity, price: product.price })
      }
    }

    if (total === 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 })
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: session.user.id,
        total,
        status: "PAID",
      })
      .select("id")
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    for (const item of itemDetails) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single()

      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })

      if (product) {
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
