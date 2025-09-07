"use client"

import { motion } from "framer-motion"
import { Star, Heart, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import Link from "next/link"
import Image from "next/image"

interface RelatedToursProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tours: any[]
}

export function RelatedTours({ tours }: RelatedToursProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useStore()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleWishlist = (tour: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInWishlist = wishlist.some((item: any) => item.id === tour.id)
    if (isInWishlist) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist({ ...tour, type: "tour" })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Tours</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.slice(0, 3).map((tour, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const isInWishlist = wishlist.some((item: any) => item.id === tour.id)

          return (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={100}
                    height={24}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm"
                    onClick={() => toggleWishlist(tour)}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Badge className="absolute bottom-3 left-3" variant="secondary">
                    {tour.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{tour.title}</h3>
                      <p className="text-gray-600 text-sm">{tour.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Max {tour.maxGroupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-primary">
                      ${tour.price}
                      <span className="text-sm font-normal text-gray-600">/person</span>
                    </p>
                    <Link href={`/tours/${tour.id}`}>
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
