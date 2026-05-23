"use client"

import { useLayoutEffect, useRef } from "react"
import Image from "next/image"

export default function FloatingGif() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    let x = 80
    let y = 80
    let vx = 4 + Math.random() * 3
    let vy = 3 + Math.random() * 2
    let rotation = 0
    let raf: number

    const clampPosition = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const ew = el.offsetWidth
      const eh = el.offsetHeight

      if (x + ew > vw) x = vw - ew
      if (x < 0) x = 0
      if (y + eh > vh) y = vh - eh
      if (y < 0) y = 0
    }

    const setTransform = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`
    }

    const animate = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const ew = el.offsetWidth
      const eh = el.offsetHeight

      x += vx
      y += vy

      if (x + ew >= vw) {
        x = vw - ew
        vx = -(3 + Math.random() * 3)
        rotation += 15
      }
      if (x <= 0) {
        x = 0
        vx = 3 + Math.random() * 3
        rotation += 15
      }
      if (y + eh >= vh) {
        y = vh - eh
        vy = -(3 + Math.random() * 2)
        rotation += 15
      }
      if (y <= 0) {
        y = 0
        vy = 3 + Math.random() * 2
        rotation += 15
      }

      setTransform()
      raf = requestAnimationFrame(animate)
    }

    clampPosition()
    setTransform()
    raf = requestAnimationFrame(animate)

    const handleResize = () => {
      clampPosition()
      setTransform()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-50 w-36 h-36 md:w-56 md:h-56 rounded-full border-2 border-border/40 overflow-hidden shadow-2xl bg-black select-none pointer-events-none"
      style={{ willChange: "transform" }}
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
