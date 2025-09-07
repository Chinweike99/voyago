"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, MapPin, Grid, List } from "lucide-react"
import Link from "next/link"
import type { Destination, SearchFilters } from "@/lib/types"
import { useAppStore } from "@/lib/store"
import Image from "next/image"

interface ExploreResultsProps {
  destinations: Destination[]
  loading: boolean
  filters: SearchFilters
}

export function ExploreResults({ destinations, loading, filters }: ExploreResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const { wishlist, addToWishlist, removeFromWishlist } = useAppStore()

  const toggleWishlist = (destinationId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (wishlist.includes(destinationId as any)) {
      removeFromWishlist(destinationId)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addToWishlist(destinationId as any)
    }
  }

  const sortedDestinations = [...destinations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      case "country":
        return a.country.localeCompare(b.country)
      case "reviews":
        return b.reviewCount - a.reviewCount
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted rounded w-32 animate-pulse" />
          <div className="h-10 bg-muted rounded w-40 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl h-96 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (destinations.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <MapPin className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No destinations found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search terms to find more destinations.
        </p>
        <Button variant="outline">Clear Filters</Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {destinations.length} Destination{destinations.length !== 1 ? "s" : ""}
          </h2>
          {filters.destination && <p className="text-muted-foreground">Results for &apos;{filters.destination}&apos;</p>}
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="country">Country</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
        >
          {sortedDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              {viewMode === "grid" ? (
                <Card className="glass-card border-0 overflow-hidden hover:shadow-2xl transition-all duration-500">
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
              ) : (
                <Card className="glass-card border-0 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-64 h-48 sm:h-32 overflow-hidden">
                        <Image
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          width={100}
                          height={100}
                          sizes="100vw"
                        />
                        <motion.button
                          onClick={() => toggleWishlist(destination.id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              wishlist.includes(destination.id as any) ? "text-red-500 fill-red-500" : "text-white"
                            }`}
                          />
                        </motion.button>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {destination.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {destination.country}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{destination.rating}</span>
                            <span className="text-sm text-muted-foreground">({destination.reviewCount})</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-3 line-clamp-2">{destination.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 2).map((highlight) => (
                              <Badge key={highlight} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>

                          <Link href={`/destinations/${destination.id}`}>
                            <Button size="sm" className="gradient-primary text-white">
                              Explore
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
