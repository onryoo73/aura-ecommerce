import db from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AddToCartButton from "@/components/shop/AddToCartButton";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = await db.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    take: 4,
  });

  // Convert Prisma product to our Product type (handle dates)
  const formattedProduct = {
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  };

  // Determine stock status
  const stockStatus = product.stock === 0 ? "out" : product.stock <= 10 ? "low" : "in";

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header with Navigation */}
      <div className="sticky top-0 z-50 bg-background border-b border-border/10 px-6 md:px-10 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-foreground hover:opacity-70 transition-opacity">
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Shop</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Shop</span>
            <span className="text-sm text-muted-foreground">Bag (0)</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="w-full px-6 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Product Image - Left Side */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square bg-secondary rounded-sm overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="flex flex-col justify-start">
            {/* Product Category */}
            <div className="mb-6">
              <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                {product.category}
              </p>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl md:text-4xl font-light text-foreground mb-8">
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {product.description || "No description available."}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-8 border-b border-border/20 pb-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Qty</span>
                  <div className="flex items-center gap-4 border border-border/20 rounded px-4 py-2">
                    <button className="text-lg font-light text-foreground hover:opacity-60 transition-opacity">−</button>
                    <span className="text-sm font-medium w-6 text-center">1</span>
                    <button className="text-lg font-light text-foreground hover:opacity-60 transition-opacity">+</button>
                  </div>
                </div>
              </div>

              {/* Add to Bag / Sold Out */}
              {stockStatus === "out" ? (
                <div className="py-4 text-center">
                  <p className="text-lg font-medium text-foreground line-through opacity-60">
                    Sold out
                  </p>
                </div>
              ) : (
                <AddToCartButton product={formattedProduct} disabled={false} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="w-full px-6 md:px-10 py-20 border-t border-border/10">
          <h2 className="text-2xl font-bold text-foreground mb-12">Related Products</h2>
          <RelatedProducts products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
