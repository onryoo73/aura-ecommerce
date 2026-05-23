"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function FloatingGif() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const w = window.innerWidth
    const h = window.innerHeight
    const rw = el.offsetWidth
    const rh = el.offsetHeight

    let x = w - rw - 40
    let y = h - rh - 40
    let vx = -(2 + Math.random() * 2)
    let vy = -(1.5 + Math.random() * 1.5)
    let rotation = 0
    let raf: number

    el.style.transform = `translate(${x}px, ${y}px)`

    const animate = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const ew = el.offsetWidth
      const eh = el.offsetHeight

      x += vx
      y += vy

      if (x + ew > vw) { x = vw - ew; vx = -(1.5 + Math.random() * 2); rotation += 15 }
      if (x < 0) { x = 0; vx = 1.5 + Math.random() * 2; rotation += 15 }
      if (y + eh > vh) { y = vh - eh; vy = -(1.5 + Math.random() * 1.5); rotation += 15 }
      if (y < 0) { y = 0; vy = 1.5 + Math.random() * 1.5; rotation += 15 }

      el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed z-50 w-36 h-36 md:w-56 md:h-56 rounded-full border-2 border-border/40 overflow-hidden shadow-2xl bg-black select-none pointer-events-none"
    >
      <Image
        src="https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif"
        alt="Homer Simpson backing into bushes"
        fill
        className="object-cover scale-110"
        unoptimized
      />
    </div>
  )
}
