"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import CartItem from "@/components/shop/CartItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto py-20 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Loading your bag...</div>
      </div>
    );
  }

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Before you can checkout, you must add some products to your shopping bag.
          Explore our collection to find something you like.
        </p>
        <Link 
          href="/" 
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-12 tracking-tight">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="border-t border-border">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-secondary/20 rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg flex items-center justify-center group hover:opacity-90 transition-opacity"
            >
              Checkout
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Secure checkout powered by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
