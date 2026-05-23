import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { deleteProduct } from "@/lib/admin-actions"
import BulkUpload from "@/components/BulkUpload"

export default async function AdminProductsPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
        <div className="flex items-center gap-4">
          <BulkUpload />
          <Link
            href="/admin/products/add"
            className="bg-primary text-primary-foreground px-4 py-2 font-medium flex items-center hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left border-collapse">
            <thead>
            <tr className="bg-secondary/30 border-b border-border">
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Product</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Category</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Price</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px]">Stock</th>
              <th className="p-4 font-semibold text-sm text-muted-foreground tracking-wider uppercase text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {(products || []).map((product) => (
              <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 relative flex-shrink-0 rounded overflow-hidden border border-border/50 mr-4 bg-secondary">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {product.category}
                </td>
                <td className="p-4 text-sm font-medium">
                  {formatPrice(product.price)}
                </td>
                <td className="p-4 text-sm">
                  <span className={product.stock < 10 ? "text-destructive font-bold" : ""}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="p-2 hover:bg-secondary rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button className="p-2 hover:bg-secondary rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
