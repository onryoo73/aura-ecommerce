"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { useState } from "react";
import { Check, ShoppingBag, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled = false }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isDisabled = disabled || product.stock === 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="p-2 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= product.stock) {
                setQuantity(value);
              }
            }}
            className="w-16 text-center border-x border-border py-2 focus:outline-none"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className="p-2 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        disabled={isDisabled}
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
    </div>
  );
}
