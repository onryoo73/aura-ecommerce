"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })

    // Fade in black overlay with AURA text
    timeline
      .fromTo(
        overlayRef.current,
        { yPercent: 0, opacity: 1 },
        { yPercent: -100, opacity: 1, duration: 1, ease: "power4.inOut" }
      )

    // Fade in page content
    if (containerRef.current) {
      timeline.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
    }

    return () => {
      timeline.kill()
    }
  }, [pathname])

  return (
    <>
      {/* Loading Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-black flex items-center justify-center pointer-events-none"
        style={{ yPercent: 0 }}
      >
        <div className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
          AURA
        </div>
      </div>

      {/* Page Content */}
      <div ref={containerRef} className="page-transition">
        {children}
      </div>
    </>
  )
}
