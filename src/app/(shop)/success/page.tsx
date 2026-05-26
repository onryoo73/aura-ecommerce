import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="w-full min-h-screen bg-background pt-28 px-6 md:px-10 pb-24 transition-colors duration-300 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
        </div>

        <div className="border-b border-foreground/15 pb-4 mb-8">
          <h1 className="text-[15vw] md:text-[10vw] font-black tracking-[-0.04em] leading-[0.85] text-foreground uppercase">
            Confirmed
          </h1>
        </div>

        <p className="text-muted-foreground text-sm tracking-wider uppercase max-w-md mx-auto mb-12">
          Thank you for your purchase. We&apos;ve received your order and are getting it ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/account/orders"
            className="border border-foreground/30 hover:border-foreground px-8 py-4 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300"
          >
            View Order History
          </Link>
          <Link
            href="/"
            className="bg-foreground text-background px-8 py-4 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:opacity-90"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
