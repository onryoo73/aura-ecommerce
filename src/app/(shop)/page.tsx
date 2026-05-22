import db from "@/lib/db"
import CustomCursor from "@/components/CustomCursor"
import StaggeredProductGrid from "@/components/shop/StaggeredProductGrid"
import Image from "next/image"

export const revalidate = 0 // always fetch fresh database content

export default async function ShopPage() {
  const allProducts = await db.product.findMany({
    orderBy: { createdAt: "asc" },
  })

  // Format the products to match components expectations
  const formattedProducts = allProducts.map((product) => ({
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  }))

  return (
    <div className="w-full bg-background transition-colors duration-300">
      <CustomCursor />

      {/* Hero Section matching Screen 1 */}
      <section className="w-full pt-28 pb-10 px-6 md:px-10">
        <div className="w-full">
          {/* Giant AURA Header with Circled R */}
          <div className="relative w-full select-none font-outfit mt-4">
            <div className="flex items-end justify-between relative border-b border-foreground/15 pb-2">
              <h1 className="text-[28vw] font-black tracking-[-0.04em] leading-[0.85] text-foreground uppercase">
                AURA
              </h1>
              {/* Circular Registered Trademark Logo */}
              <div className="flex-shrink-0 text-xs md:text-2xl border-2 border-foreground rounded-full w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center font-bold font-sans mb-2 md:mb-4 mr-1 select-none bg-foreground text-background">
                R
              </div>
            </div>
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

          {/* 4 cropped images side-by-side representing details */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-border/10 divide-x divide-border/10 bg-secondary/20">

            {/* Col 1: Neck Tattoo Cropped Shot */}
            <div className="relative aspect-[4/5] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1590246814883-57c511e76523?auto=format&fit=crop&w=800&q=80"
                alt="Neck Tattoo Detail"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Col 2: Cap Detail (With absolute embroidered ++ logo overlay) */}
            <div className="relative aspect-[4/5] overflow-hidden group bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
                alt="Cap Detail"
                fill
                className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Custom embroidered ++ overlay on cap front */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white text-3xl font-black font-sans tracking-tighter opacity-90 drop-shadow-md select-none bg-black/10 px-2 py-0.5 rounded">
                  ++
                </span>
              </div>
            </div>

            {/* Col 3: Sweatshirt Detail (With absolute red rectangular badge overlay) */}
            <div className="relative aspect-[4/5] overflow-hidden group bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
                alt="Sweatshirt Detail"
                fill
                className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Custom red badge overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="bg-red-600 text-white p-2 text-[5px] md:text-[6px] tracking-[0.1em] uppercase font-bold text-center border border-red-500 shadow-lg select-none leading-tight max-w-[120px] w-24">
                  <div>HELLO HALLO</div>
                  <div>OUTFIT COLLECTION</div>
                  <div>NON - WORLD</div>
                  <div>R90 - S + RETRO</div>
                </div>
              </div>
            </div>

            {/* Col 4: Backpack Detail */}
            <div className="relative aspect-[4/5] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
                alt="Backpack Detail"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal space banner displaying some items + pricing, matching Screen 4 banner */}
      <section className="w-full px-6 md:px-10 py-6 overflow-hidden">
        <div className="w-full flex flex-wrap justify-between items-center text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase gap-4 border-b border-border/10 pb-6">
          <div className="flex items-center gap-1.5">
            <span>OFF BY DESIGN</span>
            <span className="font-mono text-foreground font-semibold">$33.00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>KERNED CONFIDENCE</span>
            <span className="font-mono text-foreground font-semibold">$25.00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>SPECIMEN NO. HH01</span>
            <span className="font-mono text-foreground font-semibold">$30.00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>GRID SYSTEM GO</span>
            <span className="font-mono text-foreground font-semibold">$30.00</span>
          </div>
        </div>
      </section>

      {/* Main product listings: Staggered Editorial Grid */}
      <section className="w-full py-10 pb-24 px-6 md:px-10">
        <div className="w-full">
          <StaggeredProductGrid products={formattedProducts} />
        </div>
      </section>
    </div>
  )
}
