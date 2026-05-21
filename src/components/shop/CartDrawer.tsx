"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

export default function CartDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { items, getTotal, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col focus:outline-none animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <Dialog.Title className="text-xl font-bold">Your Bag ({itemCount})</Dialog.Title>
            </div>
            <Dialog.Close className="p-2 hover:bg-secondary rounded-full transition-colors">
              <X className="w-6 h-6" />
            </Dialog.Close>
          </div>

          <div className="flex-grow overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">Your bag is empty</p>
                <p className="text-muted-foreground mt-2 mb-8">Looks like you haven&apos;t added anything yet.</p>
                <Dialog.Close asChild>
                  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Continue Shopping
                  </button>
                </Dialog.Close>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-secondary/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-bold">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6 text-center">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity mb-4"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="block w-full text-center text-sm font-medium hover:underline"
              >
                View Full Bag
              </Link>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
