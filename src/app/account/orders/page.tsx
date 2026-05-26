import { auth } from "@/auth"
import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function OrdersPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="w-full min-h-screen bg-background pt-28 px-6 md:px-10 pb-24 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto">
        <div className="border-b border-foreground/15 pb-4 mb-12">
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.04em] leading-[0.85] text-foreground uppercase">
            Orders
          </h1>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground text-lg mb-8 tracking-wider uppercase text-[11px]">
              You haven&apos;t placed any orders yet.
            </p>
            <a
              href="/"
              className="inline-block border border-foreground/30 hover:border-foreground px-6 py-3 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border border-border/10 bg-card/40"
              >
                {/* Header */}
                <div className="bg-secondary/20 p-4 md:p-6 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-6 md:gap-10">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                        Placed
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(order.created_at || order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                        Total
                      </p>
                      <p className="text-sm font-bold text-foreground font-mono">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                      Order
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 border border-emerald-500/30 px-3 py-1">
                    {order.status}
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-border/10">
                  {(order.order_items || []).map((item: any) => (
                    <div
                      key={item.id}
                      className="p-4 md:p-6 flex items-center gap-4"
                    >
                      <div className="h-16 w-16 md:h-20 md:w-20 relative flex-shrink-0 border border-border/50 bg-secondary">
                        {item.products?.image && (
                          <Image
                            src={item.products.image}
                            alt={item.products?.name || "Product"}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.products?.name || "Product"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-mono font-medium text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
