import db from "@/lib/db"

export async function getFeaturedProducts() {
  const products = await db.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
  return products
}
