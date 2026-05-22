import db from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductTabs from "@/components/ProductTabs";
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
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link href={`/?category=${product.category}`} className="hover:text-foreground transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <ProductImageGallery image={product.image} name={product.name} />

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-medium mb-6">{formatPrice(product.price)}</p>
          
          {/* Stock Status Badge */}
          <div className="mb-6">
            {stockStatus === "in" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                In Stock
              </span>
            )}
            {stockStatus === "low" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                Low Stock ({product.stock} left)
              </span>
            )}
            {stockStatus === "out" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>

          <div className="mt-auto space-y-4">
            <AddToCartButton product={formattedProduct} disabled={stockStatus === "out"} />
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs description={product.description} />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
