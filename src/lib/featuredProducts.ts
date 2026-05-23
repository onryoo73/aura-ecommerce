import { supabase } from "@/lib/supabase"

export async function getFeaturedProducts() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("isFeatured", true)
    .order("createdAt", { ascending: false })
    .limit(4)

  return products || []
}
