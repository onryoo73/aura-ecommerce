"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import CartItem from "@/components/shop/CartItem";
import FloatingGif from "@/components/FloatingGif";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-background px-6 md:px-10">
        <div className="animate-pulse text-xs tracking-[0.3em] text-muted-foreground uppercase font-bold">
          LOADING YOUR BAG...
        </div>
      </div>
    );
  }

  const total = getTotal();

  // Empty cart view matching Screen 3
  if (items.length === 0) {
    return (
      <div className="w-full min-h-[85vh] flex flex-col bg-background pt-24 px-6 md:px-10 pb-20 transition-colors duration-300">
        {/* Giant YOUR BAG Header */}
        <div className="w-full select-none font-outfit mt-4 border-b border-foreground/15 pb-4">
          <h1 className="text-[17vw] font-black tracking-[-0.04em] leading-[0.8] text-foreground uppercase">
            YOUR BAG
          </h1>
        </div>

        {/* Empty state message and Homer Simpson GIF */}
        <div className="relative flex-grow flex flex-col justify-center mt-12 md:mt-20">
          <div className="relative z-10">
            <h2 className="text-[9vw] font-black tracking-[-0.03em] leading-[0.85] text-foreground font-outfit uppercase select-none max-w-[80vw]">
              Not even one thing?
              <br />
              <span className="opacity-40 select-none">That's sad.</span>
            </h2>

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-10 border border-foreground/30 hover:border-foreground px-6 py-3 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 bg-background text-foreground cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Shop
            </Link>
          </div>

          {/* Animated Homer Simpson in bushes circle sticker */}
          <FloatingGif />
        </div>
      </div>
    );
  }

  // Active cart view with items
  return (
    <div className="w-full min-h-screen bg-background pt-24 px-6 md:px-10 pb-24 transition-colors duration-300">
      {/* Giant YOUR BAG Header */}
      <div className="w-full select-none font-outfit mt-4 border-b border-foreground/15 pb-4">
        <h1 className="text-[17vw] font-black tracking-[-0.04em] leading-[0.8] text-foreground uppercase">
          YOUR BAG
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12">
        {/* Cart items list */}
        <div className="lg:col-span-8 flex flex-col border-t border-border/15">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary Panel */}
        <div className="lg:col-span-4">
          <div className="bg-card/40 border border-border/10 p-8 sticky top-28 backdrop-blur-sm">
            <h2 className="text-xs tracking-[0.25em] font-bold uppercase mb-6 text-foreground">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 mb-8 text-xs tracking-wider uppercase text-muted-foreground">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="font-mono text-foreground font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span className="text-emerald-500 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>TAX</span>
                <span className="font-mono text-foreground font-semibold">{formatPrice(0)}</span>
              </div>
              <div className="pt-4 border-t border-border/15 flex justify-between text-sm font-bold text-foreground">
                <span className="tracking-[0.2em]">TOTAL</span>
                <span className="font-mono font-bold text-base">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-[#e63946] text-white hover:bg-red-600 transition-colors py-4 text-[10px] tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-2 group cursor-pointer"
            >
              PROCEED TO CHECKOUT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="mt-6 text-center text-[9px] tracking-wide text-muted-foreground uppercase">
              Secure checkout powered by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
