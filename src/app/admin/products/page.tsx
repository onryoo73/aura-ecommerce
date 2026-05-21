import db from "@/lib/db"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { deleteProduct } from "@/lib/admin-actions"

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/20 border-b border-border">
              <th className="p-4 font-semibold text-sm">Product</th>
              <th className="p-4 font-semibold text-sm">Category</th>
              <th className="p-4 font-semibold text-sm">Price</th>
              <th className="p-4 font-semibold text-sm">Stock</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 relative flex-shrink-0 rounded-md overflow-hidden border border-border mr-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {product.category}
                </td>
                <td className="p-4 text-sm font-medium">
                  {formatPrice(product.price)}
                </td>
                <td className="p-4 text-sm">
                  <span className={product.stock < 10 ? "text-red-600 font-bold" : ""}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="p-2 hover:bg-secondary rounded-full transition-colors"
                    >
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
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
  )
}
