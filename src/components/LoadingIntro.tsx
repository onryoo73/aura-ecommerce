"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

export default function LoadingIntro() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => setIsLoading(false),
    })

    timeline
      .fromTo(
        ".loading-text",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .to(".loading-text", { y: -100, opacity: 0, duration: 0.8, ease: "power3.in" }, "+=0.5")
      .to(".loading-overlay", { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.4")
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loading-overlay fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <div className="loading-text text-6xl md:text-8xl font-bold tracking-tighter text-white">
            AURA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
