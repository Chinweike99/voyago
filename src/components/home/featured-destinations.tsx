"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, MapPin } from "lucide-react"
// import { api } from "@/lib/api"
import type { Destination } from "@/lib/types"
import { useAppStore } from "@/lib/store"
import { api } from "@/lib/app"
import Image from "next/image"

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const { wishlist, addToWishlist, removeFromWishlist } = useAppStore()

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await api.getDestinations()
        setDestinations(data)
      } catch (error) {
        console.error("Failed to load destinations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
  }, [])

  const toggleWishlist = (destinationId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (wishlist.includes(destinationId as any)) {
      removeFromWishlist(destinationId)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addToWishlist(destinationId as any)
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Featured
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dream Destinations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover handpicked destinations that offer extraordinary experiences and unforgettable memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass-card py-0 border-0 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={150}
                    height={150}
                     sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Wishlist button */}
                  <motion.button
                    onClick={() => toggleWishlist(destination.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        wishlist.includes(destination.id as any) ? "text-red-500 fill-red-500" : "text-white"
                      }`}
                    />
                  </motion.button>

                  {/* Location badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                      <MapPin className="w-3 h-3 mr-1" />
                      {destination.country}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                      <span className="text-sm text-muted-foreground">({destination.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{destination.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.highlights.slice(0, 3).map((highlight) => (
                      <Badge key={highlight} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/destinations/${destination.id}`}>
                    <Button className="w-full gradient-primary text-white hover:shadow-lg transition-all duration-300">
                      Explore Destination
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            {/* <Button variant="outline" size="lg" className="px-8 bg-transparent">
              View All Destinations
            </Button> */}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
