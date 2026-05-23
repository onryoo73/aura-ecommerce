"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"

interface PromoItem {
  name: string
  price: number
  active: boolean
}

export default function PromoBanner() {
  const [items, setItems] = useState<PromoItem[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    supabase
      .from("promo_banner")
      .select("name, price, active")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setItems(data as PromoItem[])
      })
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    gsap.fromTo(
      itemsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    )
  }, [items])

  if (items.length === 0) return null

  return (
    <section className="w-full px-6 md:px-10 py-6 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full flex flex-wrap justify-between items-center text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase gap-4 border-b border-border/10 pb-6"
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { if (el) itemsRef.current[i] = el }}
            className="flex items-center gap-1.5"
          >
            <span>{item.name}</span>
            {item.price > 0 && (
              <span className="font-mono text-foreground font-semibold">
                {formatPrice(item.price)}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
