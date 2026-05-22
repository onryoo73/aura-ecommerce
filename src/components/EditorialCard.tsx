"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"

interface EditorialCardProps {
  product: Product
  index: number
  aspectRatio?: string
}

export default function EditorialCard({ product, index, aspectRatio = "aspect-[3/4]" }: EditorialCardProps) {
  return (
    <motion.div
      className="group relative w-full h-full overflow-hidden bg-secondary"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/product/${product.id}`} className="block w-full h-full">
        <div className={`relative w-full h-full overflow-hidden ${aspectRatio}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        <div className="mt-5 px-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground tracking-tight truncate">
                {product.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
                {product.category}
              </p>
            </div>
            <p className="text-sm text-foreground/80 whitespace-nowrap tabular-nums mt-0.5">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
