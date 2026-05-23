"use client"

import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"

const GIF_URLS = [
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhkcWN3N3ZxZjhrdzJjMmcwdW5zcnljbzhoMzY4Zmc1aDB5Z3UwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PyoyQRPyZXYq7mfxxs/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmlrZnViMzNheTJpNTk5cjJjMXoyYXZzemYzcDBpNW9hZW45NTRubCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yIxNOXEMpqkqA/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGlmaDBwZHltcjVtY3FrZzlkY3Zsc3BjdXU3MjhpNGQ5NndpeGE4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SJcJxtq3rxpW0Wy4UM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VlZjI2OXl3ZTQ5bnAyODdrY2R2eDh0Y3d6anUzaDZkaTFoa2FmYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/A3wb4uEFdeUFrlAFuk/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VlZjI2OXl3ZTQ5bnAyODdrY2R2eDh0Y3d6anUzaDZkaTFoa2FmYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mFvaM65uQ6bu0/giphy.gif",
]

const randomGif = (exclude?: string) => {
  const options = exclude ? GIF_URLS.filter((url) => url !== exclude) : GIF_URLS
  return options[Math.floor(Math.random() * options.length)]
}

export default function FloatingGif() {
  const [gifUrl, setGifUrl] = useState(() => randomGif())
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
        setGifUrl((current) => randomGif(current))
      }
      if (x <= 0) {
        x = 0
        vx = 3 + Math.random() * 3
        rotation += 15
        setGifUrl((current) => randomGif(current))
      }
      if (y + eh >= vh) {
        y = vh - eh
        vy = -(3 + Math.random() * 2)
        rotation += 15
        setGifUrl((current) => randomGif(current))
      }
      if (y <= 0) {
        y = 0
        vy = 3 + Math.random() * 2
        rotation += 15
        setGifUrl((current) => randomGif(current))
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
      className="fixed top-0 left-0 z-50 w-28 h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 rounded-full border-2 border-border/40 overflow-hidden shadow-2xl bg-black select-none pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <Image
        src={gifUrl}
        alt="Fun animated gift"
        fill
        className="object-cover scale-110"
        unoptimized
      />
    </div>
  )
}
