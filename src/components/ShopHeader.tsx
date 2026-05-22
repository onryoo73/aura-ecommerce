"use client"

import { motion } from "framer-motion"

interface ShopHeaderProps {
  children: React.ReactNode
}

export default function ShopHeader({ children }: ShopHeaderProps) {
  return (
    <motion.header 
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.header>
  )
}
