"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex py-6 border-b border-border last:border-0">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-secondary/20">
        <Image
          src={item.image}
          alt={item.name}
          width={96}
          height={96}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3>{item.name}</h3>
            <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-secondary transition-colors"
            >
              <Minus className="h-4 h-4" />
            </button>
            <span className="px-3 font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-secondary transition-colors"
            >
              <Plus className="h-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center text-destructive hover:opacity-80 transition-opacity"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
