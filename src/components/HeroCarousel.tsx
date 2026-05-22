"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Parallax } from "swiper/modules"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/parallax"

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
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden border-b border-border">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        parallax={true}
        className="w-full h-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative w-full h-full bg-secondary">
              <div
                className="absolute inset-0"
                data-swiper-parallax="-30%"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover opacity-80"
                  priority
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20">
                <div className="container mx-auto">
                  <motion.div
                    data-swiper-parallax="-100"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <div className="text-xs text-red-500 tracking-widest mb-4">FEATURED</div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
                      {product.name}
                    </h2>
                    <p className="text-3xl md:text-4xl text-white mb-8 font-light">
                      {formatPrice(product.price)}
                    </p>
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-block bg-red-500 text-white px-8 py-4 font-bold tracking-widest hover:bg-red-600 transition-colors"
                    >
                      SHOP NOW
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
