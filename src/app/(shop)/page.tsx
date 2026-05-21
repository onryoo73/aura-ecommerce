import db from "@/lib/db";
import ProductGrid from "@/components/shop/ProductGrid";

export const revalidate = 3600; // revalidate every hour

export default async function ShopPage() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Aura Collection</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Curated essentials for the modern minimalist.
        </p>
      </header>
      
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
