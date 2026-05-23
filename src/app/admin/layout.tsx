import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.isAdmin) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-border bg-card p-6 hidden md:block">
        <h2 className="text-lg font-bold tracking-tight mb-8">Admin Panel</h2>
        <nav className="space-y-1">
          <Link
            href="/admin/products"
            className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
          >
            Orders
          </Link>
          <Link
            href="/admin/promo"
            className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
          >
            Promo Banner
          </Link>
          <Link
            href="/"
            className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary transition-colors mt-8"
          >
            ← Back to Shop
          </Link>
        </nav>
      </aside>
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
