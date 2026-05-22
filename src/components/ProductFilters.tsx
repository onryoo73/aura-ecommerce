"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Slider } from "@radix-ui/react-slider"
import { X, Filter } from "lucide-react"

const CATEGORIES = ["All", "Clothing", "Accessories", "Footwear"]

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name A-Z" },
]

export default function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All")
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "500"),
  ])
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "default")

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "")
    setSelectedCategory(searchParams.get("category") || "All")
    setPriceRange([
      parseInt(searchParams.get("minPrice") || "0"),
      parseInt(searchParams.get("maxPrice") || "500"),
    ])
    setSelectedSort(searchParams.get("sort") || "default")
  }, [searchParams])

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    router.push(`/?${newParams.toString()}`)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    updateURL({ search: value })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL({ category: category === "All" ? "" : category })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    updateURL({ minPrice: values[0].toString(), maxPrice: values[1].toString() })
  }

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
    updateURL({ sort: sort === "default" ? "" : sort })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setPriceRange([0, 500])
    setSelectedSort("default")
    router.push("/")
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="SEARCH..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-red-500 transition-colors text-sm tracking-widest"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 border font-medium text-xs tracking-widest transition-colors ${
              selectedCategory === category
                ? "border-red-500 text-red-500 bg-red-500/10"
                : "border-border text-muted-foreground hover:border-red-500 hover:text-red-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Toggle (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full px-4 py-3 border border-border font-medium text-xs tracking-widest hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          FILTERS
        </button>
      </div>

      {/* Filter Sidebar (Desktop) / Drawer (Mobile) */}
      <div className={`${isMobileFilterOpen ? "block" : "hidden"} md:block bg-card border border-border p-6 space-y-6`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg tracking-widest">FILTERS</h3>
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-red-500 transition-colors tracking-widest"
          >
            CLEAR ALL
          </button>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold mb-4 tracking-widest">PRICE RANGE</label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              min={0}
              max={500}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-xs font-bold mb-4 tracking-widest">SORT BY</label>
          <select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-red-500 transition-colors text-sm tracking-widest"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
