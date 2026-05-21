import db from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AddToCartButton from "@/components/shop/AddToCartButton";

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

  // Convert Prisma product to our Product type (handle dates)
  const formattedProduct = {
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Link 
        href="/" 
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square relative rounded-xl overflow-hidden border border-border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-medium mb-6">{formatPrice(product.price)}</p>
          
          <div className="prose prose-sm mb-8">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between py-4 border-y border-border">
              <span className="text-sm font-medium">Availability</span>
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <AddToCartButton product={formattedProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}
