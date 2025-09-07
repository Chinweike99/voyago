"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
// import { HotelsHeader } from "@/components/hotels/hotels-header"
import { HotelsFilters } from "@/components/hotels/hotels-filters"
import { HotelsResults } from "@/components/hotels/hotels-results"
// import { api } from "@/lib/api"
import type { Hotel, SearchFilters } from "@/lib/types"
import { api } from "@/lib/app"
import { HotelsHeader } from "@/components/hotels/hotel-header"

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<SearchFilters>({})

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true)
      try {
        const data = await api.getHotels()
        setHotels(data)
        setFilteredHotels(data)
      } catch (error) {
        console.error("Failed to load hotels:", error)
      } finally {
        setLoading(false)
      }
    }

    loadHotels()
  }, [])

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    // Apply filtering logic here
    setFilteredHotels(hotels) // Placeholder
  }

  return (
    <div className="min-h-screen pt-16">
      <HotelsHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 flex-shrink-0"
          >
            <HotelsFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={filteredHotels.length}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <HotelsResults hotels={filteredHotels} loading={loading} filters={filters} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
