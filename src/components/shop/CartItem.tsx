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
    <div className="flex py-6 border-b border-border/15 last:border-0 items-center">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-border/40 bg-secondary/20 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="h-full w-full object-cover object-center"
          sizes="96px"
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col justify-between h-24">
        <div>
          <div className="flex justify-between text-sm md:text-base font-bold uppercase tracking-tight">
            <h3>{item.name}</h3>
            <p className="ml-4 font-mono font-medium">{formatPrice(item.price * item.quantity)}</p>
          </div>
          <p className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground">{item.category}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-xs pt-2">
          <div className="flex items-center border border-border/40">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 hover:bg-foreground/5 transition-colors cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-4 font-bold font-mono">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 hover:bg-foreground/5 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center text-red-500 hover:text-red-600 transition-colors uppercase text-[10px] tracking-widest font-bold cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
