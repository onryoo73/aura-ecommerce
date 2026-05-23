import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"
import { addPromoItem, deletePromoItem, updatePromoItem } from "@/lib/admin-actions"
import { Trash2, Plus } from "lucide-react"

export default async function AdminPromoPage() {
  const { data: items } = await supabase
    .from("promo_banner")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Promo Banner</h1>
      </div>

      {/* Add new form */}
      <div className="bg-card border border-border p-6 mb-8">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">
          Add Promo Item
        </h2>
        <form action={addPromoItem} className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. NEW ARRIVALS"
              className="w-full bg-secondary border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
          <div className="w-32">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue="0"
              placeholder="0.00"
              className="w-full bg-secondary border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
          <div className="w-24">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Order
            </label>
            <input
              name="sort_order"
              type="number"
              min="0"
              defaultValue={(items?.length || 0) + 1}
              className="w-full bg-secondary border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 font-medium flex items-center hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </form>
      </div>

      {/* Existing items */}
      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left border-collapse">
            <thead>
            <tr className="bg-secondary/30 border-b border-border">
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Order</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Name</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Price</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Active</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {(items || []).map((item) => (
              <tr key={item.id} className="hover:bg-secondary/10 transition-colors">
                <form action={updatePromoItem.bind(null, item.id)} className="contents">
                  <td className="p-4">
                    <input
                      name="sort_order"
                      type="number"
                      min="0"
                      defaultValue={item.sort_order}
                      className="w-16 bg-secondary border border-border px-2 py-1 text-sm text-center text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      name="name"
                      defaultValue={item.name}
                      className="w-full bg-secondary border border-border px-3 py-1 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      defaultValue={item.price / 100}
                      className="w-24 bg-secondary border border-border px-3 py-1 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </td>
                  <td className="p-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        name="active"
                        type="checkbox"
                        defaultChecked={item.active}
                        className="w-4 h-4 accent-red-600"
                      />
                      <span className="ml-2 text-xs text-muted-foreground">
                        {item.active ? "Yes" : "No"}
                      </span>
                    </label>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 rounded transition-colors text-foreground"
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        form={`delete-${item.id}`}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </form>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-sm text-muted-foreground">
                  No promo items yet. Add one above.
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Hidden delete forms */}
      {items?.map((item) => (
        <form
          key={item.id}
          id={`delete-${item.id}`}
          action={deletePromoItem.bind(null, item.id)}
          className="hidden"
        />
      ))}
    </div>
  )
}
