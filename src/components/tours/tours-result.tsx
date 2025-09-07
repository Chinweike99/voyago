"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, MapPin } from "lucide-react"
import type { Tour, SearchFilters } from "@/lib/types"
import Image from "next/image"

interface ToursResultsProps {
  tours: Tour[]
  loading: boolean
  filters: SearchFilters
}

// Mock tour data
const mockTours = [
  {
    id: "1",
    name: "Ancient Temples & Culture Tour",
    destination: "Bali",
    description: "Explore ancient Hindu temples and traditional villages with expert local guides",
    images: ["/indonesia.jpg"],
    duration: "Full Day (8 hours)",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviewCount: 324,
    maxGroupSize: 12,
    difficulty: "easy" as const,
    includes: ["Transportation", "Guide", "Lunch", "Temple Entrance"],
    highlights: ["Tanah Lot Temple", "Traditional Village", "Rice Terraces"],
    itinerary: [],
  },
  {
    id: "2",
    name: "Santorini Sunset Photography Tour",
    destination: "Santorini",
    description: "Capture the perfect sunset shots at the most scenic locations in Santorini",
    images: ["/greece.jpg"],
    duration: "Half Day (4 hours)",
    price: 125,
    currency: "USD",
    rating: 4.8,
    reviewCount: 189,
    maxGroupSize: 8,
    difficulty: "moderate" as const,
    includes: ["Professional Guide", "Photography Tips", "Transportation"],
    highlights: ["Oia Village", "Blue Domes", "Sunset Views"],
    itinerary: [],
  },
]

export function ToursResults({ tours, loading }: ToursResultsProps) {
  const displayTours = tours.length > 0 ? tours : mockTours

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-xl h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {displayTours.length} Tour{displayTours.length !== 1 ? "s" : ""}
        </h2>
      </div>

      <div className="space-y-6">
        {displayTours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="glass-card py-0 border-0 overflow-hidden hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="relative w-full lg:w-80 h-64 md:h-64 overflow-hidden">
                    <Image
                      src={tour.images[0] || "/placeholder.svg"}
                      alt={tour.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      width={150}
                      height={150}
                      sizes="100vw"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                        <MapPin className="w-3 h-3 mr-1" />
                        {tour.destination}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{tour.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {tour.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Max {tour.maxGroupSize}
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {tour.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{tour.rating}</span>
                          <span className="text-sm text-muted-foreground">({tour.reviewCount})</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${tour.price}
                          <span className="text-sm font-normal text-muted-foreground">/person</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{tour.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.slice(0, 3).map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline">View Details</Button>
                      <Button className="gradient-primary text-white">Book Tour</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
