"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Product } from "@/types"
import EditorialCard from "@/components/EditorialCard"

gsap.registerPlugin(ScrollTrigger)

interface EditorialGridProps {
  products: Product[]
  startIndex?: number
}

const layoutPatterns = [
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", aspect: "aspect-[4/5]" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", aspect: "aspect-[3/4]" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-2", aspect: "aspect-[3/5]" },
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", aspect: "aspect-[5/3]" },
]

export default function EditorialGrid({ products, startIndex = 0 }: EditorialGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll(".editorial-card")
    const images = grid.querySelectorAll(".editorial-image")

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      images.forEach((img) => {
        gsap.fromTo(
          img,
          { y: -20 },
          {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".editorial-card") || grid,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        )
      })
    }, grid)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full">
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
        {products.map((product, i) => {
          const pattern = layoutPatterns[i % layoutPatterns.length]
          return (
            <div
              key={product.id}
              className={`editorial-card ${pattern.colSpan} ${pattern.rowSpan}`}
            >
              <div className="w-full h-full overflow-hidden bg-secondary">
                <div
                  ref={(el) => { imageRefs.current[i] = el }}
                  className="editorial-image relative w-full overflow-hidden"
                >
                  <EditorialCard
                    product={product}
                    index={startIndex + i}
                    aspectRatio={pattern.aspect}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
