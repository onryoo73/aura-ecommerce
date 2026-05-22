"use client";

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

  // Stagger columns: dynamically sort products into 3 columns for desktop
  const col1: Product[] = [];
  const col2: Product[] = [];
  const col3: Product[] = [];

  products.forEach((product, idx) => {
    // Distribute products into columns to achieve the specific screenshot layout
    // Hello Week 001 -> Col 1
    // Hello Week 002 -> Col 2
    // Monochrome Manifest -> Col 3
    // Neutral Grotesk -> Col 1
    // Red Dot Not Award -> Col 2
    // Contrast Grid Typeface -> Col 3
    if (idx % 3 === 0) col1.push(product);
    else if (idx % 3 === 1) col2.push(product);
    else col3.push(product);
  });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
      {/* Column 1 */}
      <div className="flex flex-col gap-12 md:gap-20">
        {col1.map((product, idx) => (
          <div key={product.id} className={idx === 1 ? "md:mt-16" : ""}>
            <ProductCard product={product} index={idx * 3} />
          </div>
        ))}
      </div>

      {/* Column 2 (Staggered Column - Shifted down) */}
      <div className="flex flex-col gap-12 md:gap-20 md:pt-32">
        {col2.map((product, idx) => (
          <div key={product.id}>
            <ProductCard product={product} index={idx * 3 + 1} />
          </div>
        ))}
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-12 md:gap-20">
        {col3.map((product, idx) => {
          // Check if it is the metallic Contrast Grid Typeface tote bag
          const isContrastTote = product.name === "Contrast Grid Typeface";
          return (
            <div key={product.id} className={isContrastTote ? "relative w-full" : ""}>
              <ProductCard product={product} index={idx * 3 + 2} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
