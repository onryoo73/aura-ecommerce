"use client"

import { motion } from "framer-motion"
import ProductGrid from "@/components/shop/ProductGrid"
import { Product } from "@/types"

interface ShopProductsProps {
  products: Product[]
}

export default function ShopProducts({ products }: ShopProductsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <p className="text-muted-foreground text-sm tracking-widest">
          COLLECTION <span className="text-white ml-4">{products.length}</span>
        </p>
        <div className="text-xs text-muted-foreground tracking-widest">
          001 / {products.length.toString().padStart(3, '0')}
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </motion.div>
  )
}
