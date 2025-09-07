"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ExploreFilters } from "@/components/explore/explore-filters"
// import { ExploreResults } from "@/components/explore/explore-results"
import { ExploreHeader } from "@/components/explore/explore-header"
// import { api } from "@/lib/api"
import type { Destination, SearchFilters } from "@/lib/types"
import { useAppStore } from "@/lib/store"
import { api } from "@/lib/app"
import { ExploreResults } from "@/components/explore/explore-headers"

function ExplorePageContent() {
  const searchParams = useSearchParams()
  const { searchFilters, setSearchFilters } = useAppStore()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<SearchFilters>({})

  // Initialize filters from URL params and store
  useEffect(() => {
    const urlFilters: SearchFilters = {}

    if (searchParams.get("destination")) {
      urlFilters.destination = searchParams.get("destination")!
    }
    if (searchParams.get("checkIn")) {
      urlFilters.checkIn = searchParams.get("checkIn")!
    }
    if (searchParams.get("checkOut")) {
      urlFilters.checkOut = searchParams.get("checkOut")!
    }
    if (searchParams.get("guests")) {
      urlFilters.guests = Number.parseInt(searchParams.get("guests")!)
    }

    const combinedFilters = { ...searchFilters, ...urlFilters }
    setFilters(combinedFilters)
    setSearchFilters(combinedFilters)
  }, [searchParams, searchFilters, setSearchFilters])

  // Load destinations
  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true)
      try {
        const data = await api.getDestinations()
        setDestinations(data)
        setFilteredDestinations(data)
      } catch (error) {
        console.error("Failed to load destinations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...destinations]

    if (filters.destination) {
      const searchTerm = filters.destination.toLowerCase()
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchTerm) ||
          dest.country.toLowerCase().includes(searchTerm) ||
          dest.description.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.rating) {
      filtered = filtered.filter((dest) => dest.rating >= filters.rating!)
    }

    setFilteredDestinations(filtered)
  }, [destinations, filters])

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setSearchFilters(newFilters)
  }

  return (
    <div className="min-h-screen pt-16">
      <ExploreHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 flex-shrink-0"
          >
            <ExploreFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={filteredDestinations.length}
            />
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <ExploreResults destinations={filteredDestinations} loading={loading} filters={filters} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExplorePageContent />
    </Suspense>
  )
}
