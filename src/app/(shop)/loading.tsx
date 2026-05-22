export default function Loading() {
  return (
    <div className="w-full min-h-screen pt-32 pb-16 px-6 md:px-10">
      <div className="w-full">
        <div className="mb-16 md:mb-20">
          <div className="h-3 w-32 bg-secondary/50 animate-pulse rounded" />
          <div className="h-px bg-border/30 w-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`${i % 4 === 0 ? "md:col-span-2 md:row-span-2" : ""} ${i === 3 ? "md:col-span-2" : ""}`}
            >
              <div className={`w-full bg-secondary/30 animate-pulse ${i % 4 === 0 ? "aspect-[4/5]" : i % 4 === 2 ? "aspect-[3/5]" : "aspect-[3/4]"}`} />
              <div className="mt-5 px-1 space-y-2">
                <div className="h-4 w-3/4 bg-secondary/30 animate-pulse rounded" />
                <div className="h-3 w-20 bg-secondary/20 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
