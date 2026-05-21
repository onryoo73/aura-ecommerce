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
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-secondary/10 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            href="/admin/products"
            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Orders
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          >
            Back to Shop
          </Link>
        </nav>
      </aside>
      <main className="flex-grow p-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
