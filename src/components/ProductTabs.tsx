"use client"

import { useState } from "react"

interface ProductTabsProps {
  description: string
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = [
    { id: "details", label: "Details" },
    { id: "shipping", label: "Shipping Info" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "details" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Estimated Delivery:</strong> 3-5 business days
              </p>
              <p>
                <strong className="text-foreground">Free Shipping:</strong> On orders over $50
              </p>
              <p>
                <strong className="text-foreground">Returns:</strong> 30-day return policy for unused items
              </p>
              <p>
                <strong className="text-foreground">International Shipping:</strong> Available to select countries
              </p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
