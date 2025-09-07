"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, Share2, Star, Wifi, Car, Coffee, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"

interface HotelHeroProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hotel: any
}

export function HotelHero({ hotel }: HotelHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { wishlist, addToWishlist, removeFromWishlist } = useStore()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInWishlist = wishlist.some((item: any) => item.id === hotel.id)

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    breakfast: Coffee,
    pool: Waves,
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1))
  }

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(hotel.id)
    } else {
      addToWishlist({ ...hotel, type: "hotel" })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
          onClick={prevImage}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
          onClick={nextImage}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm" onClick={toggleWishlist}>
            <Heart className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {hotel.images.map((_: any, index: number) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
            <p className="text-gray-600 mt-1">{hotel.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-gray-600">({hotel.reviewCount} reviews)</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              ${hotel.pricePerNight}
              <span className="text-sm font-normal text-gray-600">/night</span>
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity: string) => {
            const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
            return (
              <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                {IconComponent && <IconComponent className="w-3 h-3" />}
                {amenity}
              </Badge>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
