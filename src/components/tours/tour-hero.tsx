"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, Share2, Star, Clock, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"

interface TourHeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tour: any
}

export function TourHero({ tour }: TourHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { wishlist, addToWishlist, removeFromWishlist } = useStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInWishlist = wishlist.some((item: any) => item.id === tour.id)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === tour.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1))
  }

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist({ ...tour, type: "tour" })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Image Gallery */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={tour.images[currentImageIndex]}
          alt={tour.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Navigation Buttons */}
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

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {tour.images.map((_: any, index: number) => (
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

      {/* Tour Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{tour.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Max {tour.maxGroupSize} people</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{tour.rating}</span>
              <span className="text-gray-600">({tour.reviewCount} reviews)</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              ${tour.price}
              <span className="text-sm font-normal text-gray-600">/person</span>
            </p>
          </div>
        </div>

        {/* Tour Type & Difficulty */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{tour.type}</Badge>
          <Badge variant="outline">{tour.difficulty}</Badge>
          {tour.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
