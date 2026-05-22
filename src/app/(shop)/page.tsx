import db from "@/lib/db";
import ProductGrid from "@/components/shop/ProductGrid";
import HeroCarousel from "@/components/HeroCarousel";
import { getFeaturedProducts } from "@/lib/featuredProducts";
import ProductFilters from "@/components/ProductFilters";

export const revalidate = 3600; // revalidate every hour

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; minPrice?: string; maxPrice?: string; sort?: string }
}) {
  const allProducts = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  const featuredProducts = await getFeaturedProducts();

  // Filter products based on search params
  let filteredProducts = [...allProducts];

  // Search filter
  if (searchParams.search) {
    const searchLower = searchParams.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (searchParams.category && searchParams.category !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === searchParams.category
    );
  }

  // Price range filter
  if (searchParams.minPrice || searchParams.maxPrice) {
    const minPrice = searchParams.minPrice ? parseInt(searchParams.minPrice) * 100 : 0;
    const maxPrice = searchParams.maxPrice ? parseInt(searchParams.maxPrice) * 100 : Infinity;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  // Sort
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  return (
    <div>
      <HeroCarousel products={featuredProducts} />
      <div className="container mx-auto py-12 px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Aura Collection</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Curated essentials for the modern minimalist.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Products Found: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No products found.</p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
