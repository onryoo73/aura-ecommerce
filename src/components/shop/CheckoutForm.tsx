"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutForm({ total }: { total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, clearCart } = useCartStore();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity, price: i.price })),
        }),
      });

      if (res.ok) {
        clearCart();
        window.location.href = "/account/orders";
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to create order. Please contact support.");
      }
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Pay ${formatPrice(total)}`}
      </button>

      {message && (
        <div className="text-destructive text-sm text-center mt-4">
          {message}
        </div>
      )}
    </form>
  );
}
