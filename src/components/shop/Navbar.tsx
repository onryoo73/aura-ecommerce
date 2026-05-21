"use client";

import Link from "next/link";
import { ShoppingBag, User, LayoutDashboard, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const getItemCount = useCartStore((state) => state.getItemCount);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          AURA
        </Link>

        <div className="flex items-center space-x-6">
          <CartDrawer>
            <button className="relative p-2 hover:bg-secondary rounded-full transition-colors group">
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>
          </CartDrawer>
          
          {session?.user?.isAdmin && (
            <Link href="/admin/products" className="p-2 hover:bg-secondary rounded-full transition-colors group">
              <LayoutDashboard className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>
          )}
          
          {session ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-secondary rounded-full transition-colors group"
              title="Logout"
            >
              <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <Link href="/login" className="p-2 hover:bg-secondary rounded-full transition-colors group">
              <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
