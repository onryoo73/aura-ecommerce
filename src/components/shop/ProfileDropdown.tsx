"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User, LogOut, LayoutDashboard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors duration-300 text-foreground py-1 relative opacity-70 hover:opacity-100"
      >
        <User className="w-4 h-4" />
        <span>{status === "loading" ? "..." : session?.user?.name || "Profile"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-48 bg-card border border-border shadow-lg z-50"
          >
            {status === "loading" ? (
              <div className="p-4 text-xs text-muted-foreground">Loading...</div>
            ) : session ? (
              <div className="py-2">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-xs font-semibold">{session.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                </div>
                
                {session.user?.isAdmin && (
                  <Link
                    href="/admin/products"
                    className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-secondary transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="py-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-xs hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-xs hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
