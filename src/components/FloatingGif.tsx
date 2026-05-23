"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function FloatingGif() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let x = 200, y = 200
    let vx = 1.5 + Math.random() * 1.5
    let vy = 1.5 + Math.random() * 1.5
    let raf: number

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const rw = el.offsetWidth
      const rh = el.offsetHeight

      x += vx
      y += vy

      if (x + rw > w) { x = w - rw; vx *= -1 }
      if (x < 0) { x = 0; vx *= -1 }
      if (y + rh > h) { y = h - rh; vy *= -1 }
      if (y < 0) { y = 0; vy *= -1 }

      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed z-50 w-36 h-36 md:w-56 md:h-56 rounded-full border border-border/40 overflow-hidden shadow-2xl bg-black select-none pointer-events-none"
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
