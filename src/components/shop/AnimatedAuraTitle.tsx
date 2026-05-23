"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

export default function AnimatedAuraTitle() {
  const letters = "AURA".split("")
  const rRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rRef.current
    if (!el) return

    const bounds = { x: [-80, 80], y: [-60, 60] }

    const move = () => {
      gsap.to(el, {
        x: (Math.random() * 2 - 1) * 80,
        y: (Math.random() * 2 - 1) * 60,
        rotate: Math.random() * 20 - 10,
        duration: 2 + Math.random() * 2,
        ease: "sine.inOut",
        onComplete: move,
      })
    }

    const timeout = setTimeout(move, 800)
    return () => {
      clearTimeout(timeout)
      gsap.killTweensOf(el)
    }
  }, [])

  return (
    <motion.div
      className="flex items-end justify-between relative border-b border-foreground/15 pb-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      }}
    >
      <h1 className="text-[28vw] font-black tracking-[-0.04em] leading-[0.85] text-foreground uppercase flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: 80, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>
      <motion.div
        ref={rRef}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [1.7, 0.1, 0.1, 1] }}
        className="flex-shrink-0 text-xs md:text-2xl border-2 border-foreground rounded-full w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center font-bold font-sans mb-2 md:mb-4 mr-1 select-none bg-foreground text-background"
      >
        R
      </motion.div>
    </motion.div>
  )
}
