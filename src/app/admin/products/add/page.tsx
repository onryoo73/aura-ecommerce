import { addProduct } from "@/lib/admin-actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddProductPage() {
  return (
    <div>
      <div className="flex items-center mb-8">
        <Link
          href="/admin/products"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Product</h1>

      <form action={addProduct} className="max-w-2xl">
        <div className="bg-card border border-border p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground/80">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2 text-foreground/80">
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2 text-foreground/80">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              required
              className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2 text-foreground/80">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            >
              <option value="">Select a category</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Electronics">Electronics</option>
              <option value="Home">Home</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-2 text-foreground/80">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              min="0"
              className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
              placeholder="0"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-border">
            <Link
              href="/admin/products"
              className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-secondary transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
