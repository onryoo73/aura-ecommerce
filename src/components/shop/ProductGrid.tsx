"use client"

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  // Randomly select some products to be big cards (span 2 columns)
  const bigCardIndices = new Set<number>();
  const numBigCards = Math.floor(products.length * 0.25); // 25% of products are big cards
  
  while (bigCardIndices.size < numBigCards) {
    const randomIndex = Math.floor(Math.random() * products.length);
    bigCardIndices.add(randomIndex);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px]">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className={bigCardIndices.has(index) ? "col-span-1 sm:col-span-2 row-span-2" : ""}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProductCard product={product} index={index} />
        </motion.div>
      ))}
    </div>
  );
}
