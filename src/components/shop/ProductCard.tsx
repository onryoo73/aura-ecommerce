"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block aspect-square relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="font-medium">{formatPrice(product.price)}</p>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold group-hover:underline">{product.name}</h3>
        </Link>
        <button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
