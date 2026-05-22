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
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
          className="w-full px-4 py-2 border border-border rounded-lg font-medium hover:bg-secondary transition-colors flex items-center justify-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Sidebar (Desktop) / Drawer (Mobile) */}
      <div className={`${isMobileFilterOpen ? "block" : "hidden"} md:block bg-white rounded-lg border border-border p-6 space-y-6`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-3">Price Range</label>
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
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-3">Sort By</label>
          <select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
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
