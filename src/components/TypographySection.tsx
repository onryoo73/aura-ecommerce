"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function TypographySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 120, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        descRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-32"
    >
      <div className="w-full max-w-[90vw] mx-auto text-center">
        <h1
          ref={textRef}
          className="text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold tracking-[-0.04em] leading-[0.85] text-foreground select-none"
        >
          AURA
        </h1>

        <div
          ref={dividerRef}
          className="h-px bg-border/50 w-full my-12 md:my-16 origin-left"
        />

        <div
          ref={descRef}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-left"
        >
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground tracking-wide">
            Redefining the intersection of brutalist architecture and contemporary fashion. Each piece is a study in form, texture, and restraint.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground tracking-wide">
            AURA is not merely clothing — it is an ethos. Monochromatic, architectural, and uncompromising in its pursuit of essential beauty.
          </p>
        </div>
      </div>
    </section>
  )
}
