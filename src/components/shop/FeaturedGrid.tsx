"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const items = [
  {
    src: "https://images.unsplash.com/photo-1590246814883-57c511e76523?auto=format&fit=crop&w=800&q=80",
    alt: "Neck Tattoo Detail",
    overlay: null,
  },
  {
    src: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    alt: "Cap Detail",
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white text-3xl font-black font-sans tracking-tighter opacity-90 drop-shadow-md select-none bg-black/10 px-2 py-0.5 rounded">
          ++
        </span>
      </div>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    alt: "Sweatshirt Detail",
    overlay: (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-red-600 text-white p-2 text-[5px] md:text-[6px] tracking-[0.1em] uppercase font-bold text-center border border-red-500 shadow-lg select-none leading-tight max-w-[120px] w-24">
          <div>HELLO HALLO</div>
          <div>OUTFIT COLLECTION</div>
          <div>NON - WORLD</div>
          <div>R90 - S + RETRO</div>
        </div>
      </div>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    alt: "Backpack Detail",
    overlay: null,
  },
]

const directions = [-120, -60, 60, 120]

export default function FeaturedGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-border/10 divide-x divide-border/10 bg-secondary/20">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ x: directions[i], opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative aspect-[4/5] overflow-hidden group"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${i === 1 || i === 2 ? "opacity-85" : ""}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {item.overlay}
        </motion.div>
      ))}
    </div>
  )
}
