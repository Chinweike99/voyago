"use client"

import { motion } from "framer-motion"
import { Star, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"

interface RelatedHotelsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hotels: any[]
}

export function RelatedHotels({ hotels }: RelatedHotelsProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useStore()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleWishlist = (hotel: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInWishlist = wishlist.some((item: any) => item.id === hotel.id)
    if (isInWishlist) {
      removeFromWishlist(hotel.id)
    } else {
      addToWishlist({ ...hotel, type: "hotel" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Hotels</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.slice(0, 3).map((hotel, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const isInWishlist = wishlist.some((item: any) => item.id === hotel.id)

          return (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={100}
                    height={100}
                    sizes="100vw"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm"
                    onClick={() => toggleWishlist(hotel)}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm">{hotel.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">
                      ${hotel.pricePerNight}
                      <span className="text-sm font-normal text-gray-600">/night</span>
                    </p>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
