"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="md:hidden border-b border-border bg-card px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold tracking-tight">Admin Panel</p>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border/50 text-foreground transition-colors hover:bg-secondary"
          aria-label={menuOpen ? "Close admin menu" : "Open admin menu"}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      <div className="md:flex">
        <aside
          className={`fixed inset-x-0 top-0 z-40 h-full overflow-y-auto bg-card p-6 transition-transform duration-300 md:static md:block md:h-auto md:w-64 md:translate-x-0 ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between md:hidden mb-6">
            <p className="text-lg font-bold tracking-tight">Admin Panel</p>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border/50 text-foreground transition-colors hover:bg-secondary"
              aria-label="Close admin menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-1">
            <Link
              href="/admin/products"
              className="block px-4 py-2.5 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="block px-4 py-2.5 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/admin/promo"
              className="block px-4 py-2.5 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Promo Banner
            </Link>
            <Link
              href="/"
              className="block px-4 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-secondary transition-colors mt-8"
              onClick={() => setMenuOpen(false)}
            >
              ← Back to Shop
            </Link>
          </nav>
        </aside>

        <main className="flex-grow p-6 md:p-10 md:ml-0">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
