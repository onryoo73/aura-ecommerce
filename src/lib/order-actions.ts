"use server"

import { auth } from "@/auth"
import { supabase } from "@/lib/supabase"

export async function createOrder(items: { id: string; quantity: number; price: number }[]) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

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

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: session.user.id,
      total,
      status: "PAID",
    })
    .select("id")
    .single()

  if (orderError || !order) throw new Error("Failed to create order")

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

  return { success: true, orderId: order.id }
}
