"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, MapPin, Share, ChevronLeft, ChevronRight } from "lucide-react"
import type { Destination } from "@/lib/types"
import { useAppStore } from "@/lib/store"

interface DestinationHeroProps {
  destination: Destination
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { wishlist, addToWishlist, removeFromWishlist } = useAppStore()

  // Mock additional images for gallery
  const images = [
    destination.image,
    "/luxury-tropical-beach-resort-with-crystal-clear-wa.jpg",
    "/santorini-sunset.png",
    "/bali-indonesia-rice-terraces.jpg",
  ].filter(Boolean)

  const toggleWishlist = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (wishlist.includes(destination.id as any)) {
      removeFromWishlist(destination.id)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addToWishlist(destination.id as any)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Image Gallery */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={destination.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                <MapPin className="w-3 h-3 mr-1" />
                {destination.country}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                Best time: {destination.bestTimeToVisit}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">{destination.name}</h1>

            <p className="text-xl text-white/90 mb-6 text-pretty max-w-2xl">{destination.description}</p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">{destination.rating}</span>
                <span className="text-white/70">({destination.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleWishlist}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  className={`w-5 h-5 ${
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    wishlist.includes(destination.id as any) ? "text-red-500 fill-red-500" : "text-white"
                  }`}
                />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <span>{wishlist.includes(destination.id as any) ? "Saved" : "Save"}</span>
              </motion.button>

              <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
