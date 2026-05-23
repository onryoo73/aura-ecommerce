"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function LoadingIntro() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const timeline = gsap.timeline()

    timeline
      .fromTo(
        lettersRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
      )
      .to(
        lettersRef.current,
        { y: -60, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.in" },
        "+=0.6"
      )
      .to(
        overlayRef.current,
        { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
        "-=0.3"
      )
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="flex gap-2 md:gap-4 overflow-hidden">
        {"AURA".split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => { if (el) lettersRef.current[i] = el }}
            className="inline-block text-[18vw] md:text-[14vw] font-bold tracking-tighter text-white leading-none select-none"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
