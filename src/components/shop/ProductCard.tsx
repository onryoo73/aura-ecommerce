"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group w-full flex flex-col cursor-pointer">
      {/* Product Image Container */}
      <div className="relative w-full bg-secondary overflow-hidden mb-4">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 4}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-foreground mb-2 group-hover:underline transition-all">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase text-muted-foreground font-semibold">
            <span className="inline-block w-1 h-1 rounded-full bg-foreground/60" />
            <span>{product.category}</span>
          </div>
          <span className="text-sm font-medium text-foreground">{formatPrice(product.price)}</span>
        </div>
      </div>
    </Link>
  );
}
