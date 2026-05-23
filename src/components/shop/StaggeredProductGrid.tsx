"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface StaggeredProductGridProps {
  products: Product[];
}

export default function StaggeredProductGrid({ products }: StaggeredProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground text-xs uppercase tracking-widest">
        No products found.
      </div>
    );
  }

  const col1: Product[] = [];
  const col2: Product[] = [];
  const col3: Product[] = [];

  products.forEach((product, idx) => {
    if (idx % 3 === 0) col1.push(product);
    else if (idx % 3 === 1) col2.push(product);
    else col3.push(product);
  });

  function CardWrapper({ product, idx }: { product: Product; idx: number }) {
    const direction = idx % 2 === 0 ? -120 : 120
    return (
      <motion.div
        initial={{ x: direction, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ProductCard key={product.id} product={product} index={idx} />
      </motion.div>
    )
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
      <div className="flex flex-col gap-16 md:gap-20">
        {col1.map((product, idx) => (
          <CardWrapper key={product.id} product={product} idx={idx * 3} />
        ))}
      </div>
      <div className="flex flex-col gap-16 md:gap-20 md:pt-32">
        {col2.map((product, idx) => (
          <CardWrapper key={product.id} product={product} idx={idx * 3 + 1} />
        ))}
      </div>
      <div className="flex flex-col gap-16 md:gap-20 md:pt-64">
        {col3.map((product, idx) => (
          <CardWrapper key={product.id} product={product} idx={idx * 3 + 2} />
        ))}
      </div>
    </div>
  );
}
