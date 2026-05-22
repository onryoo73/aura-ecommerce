"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative w-full flex flex-col bg-background border border-border/10 transition-colors duration-300">
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-secondary aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 4}
        />
        
        {/* Quick Add To Bag Hover Button */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={handleAddToCart}
            className="bg-background text-foreground border border-border/40 hover:border-foreground px-4 py-2 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer"
          >
            {added ? "ADDED!" : "+ ADD TO BAG"}
          </button>
        </div>
      </Link>

      <div className="mt-3 flex flex-col px-1 pb-2">
        <div className="flex justify-between items-start text-xs md:text-sm font-medium tracking-tight">
          <Link href={`/product/${product.id}`} className="hover:underline truncate max-w-[70%]">
            {product.name}
          </Link>
          <span className="font-mono">{formatPrice(product.price)}</span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-1 text-[8px] md:text-[9px] tracking-wider uppercase text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/50" />
          <span>{product.category}</span>
        </div>
      </div>
    </div>
  );
}
