"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  showQuantity?: boolean;
}

export default function AddToCartButton({ product, disabled = false, showQuantity = false }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isDisabled = disabled || product.stock === 0;

  return (
    <button
      onClick={handleAdd}
      disabled={isDisabled}
      className={cn(
        "w-full px-6 py-3 font-semibold text-base uppercase tracking-wider transition-all duration-300 border-2",
        isAdded 
          ? "bg-foreground text-background border-foreground" 
          : isDisabled
          ? "bg-background text-muted-foreground border-muted-foreground/30 cursor-not-allowed opacity-50"
          : "bg-background text-foreground border-foreground hover:bg-foreground hover:text-background"
      )}
    >
      {isAdded ? (
        <span className="flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Added to Bag
        </span>
      ) : (
        <span>{product.stock > 0 ? "Add to Bag" : "Sold out"}</span>
      )}
    </button>
  );
}
