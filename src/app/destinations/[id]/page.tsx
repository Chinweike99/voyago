"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { BookingWidget } from "@/components/booking/booking-widget"
import type { Destination } from "@/lib/types"
import { api } from "@/lib/app"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { DestinationHero } from "@/components/destination/destination-hero"
import { DestinationInfo } from "@/components/destination/destination-info"
import { DestinationReviews } from "@/components/destination/destination-reviews"
import { RelatedDestinations } from "@/components/destination/related-destinations"
// import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function DestinationDetailPage() {
  const params = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDestination = async () => {
      if (!params.id) return

      setLoading(true)
      try {
        const data = await api.getDestination(params.id as string)
        setDestination(data)
      } catch (error) {
        console.error("Failed to load destination:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDestination()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="animate-pulse">
          <div className="h-96 bg-muted" />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-32 bg-muted rounded" />
                <div className="h-64 bg-muted rounded" />
              </div>
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground">The destination you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: destination.name, href: `/destinations/${destination.id}` },
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <DestinationHero destination={destination} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <DestinationInfo destination={destination} />
            <DestinationReviews destinationId={destination.id} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <BookingWidget type="destination" item={destination} basePrice={299} currency="USD" />
          </motion.div>
        </div>
      </div>

      <RelatedDestinations currentDestinationId={destination.id} />
    </div>
  )
}
