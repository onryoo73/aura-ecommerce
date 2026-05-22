"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import "swiper/css"
import "swiper/css/effect-fade"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface HeroCarouselProps {
  products: Product[]
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  if (products.length === 0) return null

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        className="w-full h-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                <div className="container mx-auto">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {product.name}
                  </h2>
                  <p className="text-2xl md:text-3xl text-white/90 mb-6">
                    {formatPrice(product.price)}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
