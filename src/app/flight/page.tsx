"use client"

import { motion } from "framer-motion"
import { FlightsHeader } from "@/components/flights/flights-header"
import { FlightSearch } from "@/components/flights/flight-search"
import { FlightResults } from "@/components/flights/flight-results"

export default function FlightsPage() {
  return (
    <div className="min-h-screen pt-16">
      <FlightsHeader />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <FlightSearch />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FlightResults />
        </motion.div>
      </div>
    </div>
  )
}
