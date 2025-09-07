"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
// import { ToursHeader } from "@/components/tours/tours-header"
// import { ToursFilters } from "@/components/tours/tours-filters"
// import { ToursResults } from "@/components/tours/tours-results"
// import { api } from "@/lib/api"
import type { Tour, SearchFilters } from "@/lib/types"
import { api } from "@/lib/app"
import { ToursHeader } from "@/components/tours/tour-header"
import { ToursFilters } from "@/components/tours/tour-filters"
import { ToursResults } from "@/components/tours/tours-result"

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<SearchFilters>({})

  useEffect(() => {
    const loadTours = async () => {
      setLoading(true)
      try {
        const data = await api.getTours()
        setTours(data)
        setFilteredTours(data)
      } catch (error) {
        console.error("Failed to load tours:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTours()
  }, [])

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setFilteredTours(tours) // Placeholder
  }

  return (
    <div className="min-h-screen pt-16">
      <ToursHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 flex-shrink-0"
          >
            <ToursFilters filters={filters} onFiltersChange={handleFiltersChange} resultCount={filteredTours.length} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <ToursResults tours={filteredTours} loading={loading} filters={filters} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
