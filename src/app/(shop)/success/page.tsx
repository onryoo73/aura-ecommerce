import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-20 px-4 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Order Confirmed</h1>
      <p className="text-muted-foreground mb-12 max-w-md mx-auto text-lg">
        Thank you for your purchase! We&apos;ve received your order and are getting it ready for shipment.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/account/orders" 
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          View Order History
        </Link>
        <Link 
          href="/" 
          className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
