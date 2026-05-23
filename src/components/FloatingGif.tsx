"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

export default function FloatingGif() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const portalRoot = useMemo(() => typeof document !== "undefined" ? document.body : null, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let x = 20
    let y = 20
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

      el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`
      raf = requestAnimationFrame(animate)
    }

    clampPosition()
    raf = requestAnimationFrame(animate)

    const handleResize = () => {
      clampPosition()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!mounted || !portalRoot) {
    return null
  }

  return createPortal(
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
    </div>,
    portalRoot
  )
}
