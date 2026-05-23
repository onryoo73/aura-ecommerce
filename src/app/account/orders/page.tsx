import { auth } from "@/auth";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*, items:order_items(*, product:products(*))")
    .eq("userId", session.user.id)
    .order("createdAt", { ascending: false });

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Your Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="bg-secondary/20 rounded-2xl p-12 text-center">
          <p className="text-muted-foreground text-lg mb-6">You haven&apos;t placed any orders yet.</p>
          <a href="/" className="text-primary font-bold hover:underline">Start shopping</a>
        </div>
      ) : (
        <div className="space-y-8">
          {(orders || []).map((order: any) => (
            <div key={order.id} className="border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-secondary/30 p-4 sm:p-6 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Order Placed</p>
                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Total</p>
                    <p className="text-sm font-bold">{formatPrice(order.total)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground font-bold mb-1">Order ID</p>
                  <p className="text-sm font-mono text-muted-foreground">{order.id}</p>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {order.status}
                </div>
              </div>

              <div className="p-4 sm:p-6 divide-y divide-border">
                {(order.items || []).map((item: any) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center">
                    <div className="h-16 w-16 relative flex-shrink-0 rounded-md overflow-hidden border border-border">
                      <Image
                        src={item.product?.image}
                        alt={item.product?.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold">{item.product?.name || "Product"}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(item.price || item.product?.price || 0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
