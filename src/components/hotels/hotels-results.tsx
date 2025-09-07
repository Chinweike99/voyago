"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Car } from "lucide-react"
import type { Hotel, SearchFilters } from "@/lib/types"
import Image from "next/image"

interface HotelsResultsProps {
  hotels: Hotel[]
  loading: boolean
  filters: SearchFilters
}

// Mock hotel data since we don't have real data yet
const mockHotels = [
  {
    id: "1",
    name: "Grand Luxury Resort",
    destination: "Santorini",
    description: "Stunning clifftop resort with infinity pools and sunset views",
    images: ["/resort.jpg"],
    rating: 4.9,
    reviewCount: 1247,
    pricePerNight: 450,
    currency: "USD",
    amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    availability: true,
    roomTypes: [],
  },
  {
    id: "2",
    name: "Tropical Paradise Hotel",
    destination: "Bali",
    description: "Beachfront luxury with traditional Balinese architecture",
    images: ["/hotels.jpg"],
    rating: 4.8,
    reviewCount: 892,
    pricePerNight: 320,
    currency: "USD",
    amenities: ["Beach Access", "Spa", "Pool", "Restaurant"],
    coordinates: { lat: -8.3405, lng: 115.092 },
    availability: true,
    roomTypes: [],
  },
]

export function HotelsResults({ hotels, loading }: HotelsResultsProps) {
  const displayHotels = hotels.length > 0 ? hotels : mockHotels

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
          {displayHotels.length} Hotel{displayHotels.length !== 1 ? "s" : ""}
        </h2>
      </div>

      <div className="space-y-6">
        {displayHotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="glass-card py-0 border-0 overflow-hidden hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="relative w-full lg:w-80 h-64 overflow-hidden">
                    <Image
                      src={hotel.images[0] || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      width={100}
                      height={100}
                      sizes="100vw"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {hotel.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-sm text-muted-foreground">({hotel.reviewCount})</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${hotel.pricePerNight}
                          <span className="text-sm font-normal text-muted-foreground">/night</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{hotel.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity === "Free WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                          {amenity === "Parking" && <Car className="w-3 h-3 mr-1" />}
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline">View Details</Button>
                      <Button className="gradient-primary text-white">Book Now</Button>
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
