"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cartStore";
import CheckoutForm from "@/components/shop/CheckoutForm";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        className="container mx-auto py-20 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-2xl font-bold mb-4 tracking-tight">Your bag is empty</h1>
        <Link href="/" className="text-red-500 hover:underline tracking-widest">RETURN TO SHOP</Link>
      </motion.div>
    );
  }

  const total = getTotal();

  return (
    <motion.div
      className="container mx-auto py-24 px-4 max-w-5xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href="/cart" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        BACK TO BAG
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-4xl font-bold mb-8 tracking-tighter">CHECKOUT</h1>
          <div className="bg-secondary/10 rounded-none border border-border p-6 mb-8">
            <h2 className="font-bold mb-6 text-lg tracking-widest">ORDER SUMMARY</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex justify-between text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-border flex justify-between font-bold">
                <span className="tracking-widest">TOTAL</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card p-8 rounded-none border border-border"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <CheckoutForm total={total} />
            </Elements>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mb-4"></div>
              <p className="text-muted-foreground tracking-widest">INITIALIZING SECURE PAYMENT...</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
