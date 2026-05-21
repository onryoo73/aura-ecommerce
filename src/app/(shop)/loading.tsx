export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="h-10 w-64 bg-secondary animate-pulse rounded-md mb-4" />
      <div className="h-6 w-96 bg-secondary/50 animate-pulse rounded-md mb-12" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border overflow-hidden">
            <div className="aspect-square bg-secondary animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-secondary animate-pulse rounded" />
                <div className="h-4 w-12 bg-secondary animate-pulse rounded" />
              </div>
              <div className="h-6 w-3/4 bg-secondary animate-pulse rounded" />
              <div className="h-10 w-full bg-secondary animate-pulse rounded-md mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
