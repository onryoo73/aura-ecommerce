import db from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import { updateOrderStatus } from "@/lib/admin-actions"

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Orders</h1>

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/20 border-b border-border">
              <th className="p-4 font-semibold text-sm">Order ID</th>
              <th className="p-4 font-semibold text-sm">Customer</th>
              <th className="p-4 font-semibold text-sm">Total</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-secondary/5 transition-colors">
                <td className="p-4 font-mono text-sm">
                  {order.id.slice(0, 8)}
                </td>
                <td className="p-4 text-sm">
                  {order.user.email}
                </td>
                <td className="p-4 text-sm font-medium">
                  {formatPrice(order.total)}
                </td>
                <td className="p-4">
                  <form action={updateOrderStatus}>
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="px-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
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
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
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

      {orders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No orders found
        </div>
      )}
    </div>
  )
}
