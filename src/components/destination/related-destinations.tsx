"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
// import { api } from "@/lib/api"
import type { Destination } from "@/lib/types"
import { api } from "@/lib/app"
import Image from "next/image"

interface RelatedDestinationsProps {
  currentDestinationId: string
}

export function RelatedDestinations({ currentDestinationId }: RelatedDestinationsProps) {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true)
      try {
        const data = await api.getDestinations()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filtered = data.filter((dest: any) => dest.id !== currentDestinationId).slice(0, 3)
        setDestinations(filtered)
      } catch (error) {
        console.error("Failed to load related destinations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
  }, [currentDestinationId])

  if (loading || destinations.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">You Might Also Like</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover more amazing destinations that offer similar experiences and unforgettable adventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link href={`/destinations/${destination.id}`}>
                <Card className="glass-card border-0 overflow-hidden hover:shadow-xl transition-all duration-500 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={100}
                      height={100}
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

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
                      </div>
                    </div>

                    <p className="text-muted-foreground line-clamp-2">{destination.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
