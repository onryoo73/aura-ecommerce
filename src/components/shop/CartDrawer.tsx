"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <AnimatePresence>
          {open && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="fixed right-0 top-0 h-full w-full max-w-md bg-black shadow-2xl z-[101] flex flex-col focus:outline-none border-l border-border"
                >
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5" />
                      <Dialog.Title className="text-xl font-bold tracking-tight">YOUR BAG ({itemCount})</Dialog.Title>
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
                        <p className="text-lg font-medium tracking-tight">Your bag is empty</p>
                        <p className="text-muted-foreground mt-2 mb-8">Looks like you haven&apos;t added anything yet.</p>
                        <Dialog.Close asChild>
                          <button className="bg-white text-black px-8 py-3 font-bold tracking-widest hover:bg-white/90 transition-colors">
                            CONTINUE SHOPPING
                          </button>
                        </Dialog.Close>
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {items.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <CartItem item={item} />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="p-6 border-t border-border bg-secondary/10"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-medium text-muted-foreground tracking-widest">SUBTOTAL</span>
                        <span className="text-2xl font-bold">{formatPrice(total)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-6 text-center">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <Link
                        href="/checkout"
                        onClick={() => setOpen(false)}
                        className="block w-full bg-red-500 text-white text-center py-4 font-bold tracking-widest hover:bg-red-600 transition-colors mb-4"
                      >
                        CHECKOUT
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="block w-full text-center text-sm font-medium tracking-widest hover:underline"
                      >
                        VIEW FULL BAG
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
