"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Product } from "@/types"
import ProductCard from "@/components/shop/ProductCard"

interface RandomProductLayoutProps {
  products: Product[]
  startIndex: number
}

function pseudoRandom(seed: number) {
  return ((seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
}

export default function RandomProductLayout({ products, startIndex }: RandomProductLayoutProps) {
  const layout = useMemo(() => {
    return products.map((_, i) => {
      const s = pseudoRandom(startIndex + i + 1)
      const t = pseudoRandom(startIndex + i + 2)
      const u = pseudoRandom(startIndex + i + 3)
      const v = pseudoRandom(startIndex + i + 4)

      const left = 2 + s * 58
      const marginTop = 40 + (i * 180) + t * 120
      const width = 180 + u * 180
      const rotation = (v * 10) - 5
      const isBig = u > 0.7
      return { left, marginTop, width, rotation, isBig }
    })
  }, [products, startIndex])

  return (
    <div className="relative w-full" style={{ height: products.length * 220 + 500 }}>
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          className="absolute max-w-[90vw] md:max-w-none"
          style={{
            left: `${layout[i].left}%`,
            top: layout[i].marginTop,
            width: layout[i].width,
          }}
          initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotate: layout[i].rotation, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProductCard product={product} index={startIndex + i} />
        </motion.div>
      ))}
    </div>
  )
}
