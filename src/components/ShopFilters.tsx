"use client"

import { motion } from "framer-motion"

interface ShopFiltersProps {
  children: React.ReactNode
}

export default function ShopFilters({ children }: ShopFiltersProps) {
  return (
    <motion.div 
      className="lg:col-span-1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
