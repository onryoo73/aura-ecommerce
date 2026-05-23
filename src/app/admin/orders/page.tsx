import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"
import { updateOrderStatus } from "@/lib/admin-actions"

export default async function AdminOrdersPage() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*, user:users(*), items:order_items(*, product:products(*))")
    .order("createdAt", { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Orders</h1>

      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-fixed text-left border-collapse">
            <thead>
            <tr className="bg-secondary/30 border-b border-border">
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] whitespace-normal break-words">Order ID</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] whitespace-normal break-words">Customer</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] whitespace-normal break-words">Total</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] whitespace-normal break-words">Status</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] whitespace-normal break-words">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {(orders || []).map((order: any) => (
              <tr key={order.id} className="hover:bg-secondary/10 transition-colors">
                <td className="p-4 font-mono text-sm text-muted-foreground whitespace-normal break-words max-w-[90px]">
                  {order.id.slice(0, 8)}
                </td>
                <td className="p-4 text-sm whitespace-normal break-words max-w-[150px]">
                  {order.user?.email || "N/A"}
                </td>
                <td className="p-4 text-sm font-medium whitespace-normal break-words max-w-[90px]">
                  {formatPrice(order.total)}
                </td>
                <td className="p-4 whitespace-normal break-words max-w-[110px]">
                  <form action={updateOrderStatus}>
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="px-3 py-1.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                      onChange={(e) => e.target.form?.requestSubmit()}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
                  </form>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {new Date(order.created_at || order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {(!orders || orders.length === 0) && (
        <div className="text-center py-12 text-muted-foreground">
          No orders found
        </div>
      )}
    </div>
  )
}
