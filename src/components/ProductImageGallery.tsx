"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImageGalleryProps {
  image: string
  name: string
}

export default function ProductImageGallery({ image, name }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  // For now, we'll use the same image multiple times as placeholders
  // In a real app, you'd have multiple images per product
  const images = [image, image, image, image]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden border border-border group">
        <Image
          src={images[selectedImage]}
          alt={`${name} - View ${selectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? "border-primary" : "border-border"
            }`}
          >
            <Image
              src={img}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
