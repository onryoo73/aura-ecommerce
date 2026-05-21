"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cartStore";
import CheckoutForm from "@/components/shop/CheckoutForm";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [clientSecret, setClientSecret] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (items.length > 0) {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [items]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your bag is empty</h1>
        <Link href="/" className="text-primary hover:underline">Return to shop</Link>
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <Link href="/cart" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to bag
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold mb-8 tracking-tight">Checkout</h1>
          <div className="bg-secondary/10 rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4 text-lg">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-border flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <CheckoutForm total={total} />
            </Elements>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Initializing secure payment...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
