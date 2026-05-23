"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCartStore } from "@/store/cartStore"
import { useThemeStore } from "@/store/themeStore"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ProfileDropdown from "./ProfileDropdown"

export default function Navbar() {
  const pathname = usePathname()
  const getItemCount = useCartStore((state) => state.getItemCount)
  const { theme, setTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  if (pathname.startsWith("/admin")) return null

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = mounted ? getItemCount() : 0
  const isShopActive = pathname === "/" || pathname.startsWith("/product")
  const isCartActive = pathname === "/cart"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-10 h-20 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/10 transition-colors duration-300">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          ++
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/"
            className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 text-foreground py-1 relative ${
              isShopActive ? "border-b border-foreground" : "opacity-70 hover:opacity-100"
            }`}
          >
            Shop
          </Link>

          <Link
            href="/cart"
            className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 text-foreground py-1 relative ${
              isCartActive ? "border-b border-foreground" : "opacity-70 hover:opacity-100"
            }`}
          >
            Bag ({itemCount})
          </Link>

          <ProfileDropdown />

          {/* Theme switcher dots */}
          <div className="flex items-center gap-2 ml-2 md:ml-4">
            {/* Dark theme: hollow border with black dot */}
            <button
              onClick={() => setTheme('dark')}
              className={`w-3.5 h-3.5 rounded-full border border-foreground/45 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                theme === 'dark' ? 'bg-foreground/10 scale-110 border-foreground' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label="Dark Monochrome Theme"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
            </button>

            {/* Light theme: white solid */}
            <button
              onClick={() => setTheme('light')}
              className={`w-3.5 h-3.5 rounded-full bg-[#f4f3f0] border border-foreground/30 transition-all duration-300 cursor-pointer ${
                theme === 'light' ? 'scale-110 border-accent border-2' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label="Light Minimalist Theme"
            />

            {/* Red theme: red solid */}
            <button
              onClick={() => setTheme('red')}
              className={`w-3.5 h-3.5 rounded-full bg-[#e63946] border border-transparent transition-all duration-300 cursor-pointer ${
                theme === 'red' ? 'scale-110 ring-2 ring-foreground' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label="Brutalist Red Theme"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
