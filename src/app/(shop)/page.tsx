import { supabase } from "@/lib/supabase"
import ClientOnlyCustomCursor from "@/components/ClientOnlyCustomCursor"
import StaggeredProductGrid from "@/components/shop/StaggeredProductGrid"
import AnimatedAuraTitle from "@/components/shop/AnimatedAuraTitle"
import FeaturedGrid from "@/components/shop/FeaturedGrid"
import PromoBanner from "@/components/shop/PromoBanner"
import { Product } from "@/types"

export const revalidate = 0 // always fetch fresh database content

export default async function ShopPage() {
  let allProducts: Product[] = []

  try {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true })
    allProducts = (data as Product[]) || []
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }

  const formattedProducts = allProducts.map((product: any) => ({
    ...product,
    createdAt: new Date(product.created_at || product.createdAt),
    updatedAt: new Date(product.updated_at || product.updatedAt),
  }))

  return (
    <div className="w-full bg-background transition-colors duration-300">
      <ClientOnlyCustomCursor />

      {/* Hero Section matching Screen 1 */}
      <section className="w-full pt-28 pb-10 px-6 md:px-10">
        <div className="w-full">
          {/* Giant AURA Header with Circled R */}
          <div className="relative w-full select-none font-outfit mt-4">
            <AnimatedAuraTitle />
          </div>

          {/* Info bar: 4 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 pb-8 text-[10px] md:text-[11px] leading-relaxed uppercase tracking-wider text-foreground">
            {/* Col 1 */}
            <div className="flex flex-col font-bold">
              <span>AURA</span>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-2 font-medium">
              <span className="font-bold">WHY</span>
              <p className="normal-case text-muted-foreground max-w-xs tracking-wide">
                Created by the ++hellohello team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1" />
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-1 font-medium text-muted-foreground">
              <span className="font-bold text-foreground">VISIT ++ WEBSITE</span>
              <span className="hover:text-foreground cursor-pointer transition-colors mt-1">SHIPPING & RETURNS</span>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col items-end justify-between text-right text-muted-foreground font-mono font-medium">
              <span>© 2026</span>
            </div>
          </div>

          <FeaturedGrid />
        </div>
      </section>

      <PromoBanner />

      {/* Main product listings: Staggered Editorial Grid */}
      <section className="w-full py-10 pb-24 px-6 md:px-10">
        <div className="w-full">
          <StaggeredProductGrid products={formattedProducts} />
        </div>
      </section>
    </div>
  )
}
