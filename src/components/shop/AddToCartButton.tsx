"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={cn(
        "w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-lg transition-all duration-300",
        isAdded 
          ? "bg-green-600 text-white" 
          : "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
      )}
    >
      {isAdded ? (
        <>
          <Check className="w-5 h-5" />
          <span>Added to Bag</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          <span>{product.stock > 0 ? "Add to Bag" : "Out of Stock"}</span>
        </>
      )}
    </button>
  );
}
