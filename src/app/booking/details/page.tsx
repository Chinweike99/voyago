"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookingForm } from "@/components/booking/booking-form"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { BookingSummary } from "@/components/booking/booking-summary"
// import { BookingSummary } from "@/components/booking/booking-summary"
// import { Breadcrumbs } from "@/components/ui/breadcrumbs"

interface BookingData {
  type: string
  itemId: string
  itemName: string
  checkIn?: string
  checkOut?: string
  guests: number
  basePrice: number
  currency: string
}

export default function BookingDetailsPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("currentBooking")
    if (stored) {
      setBookingData(JSON.parse(stored))
    } else {
      router.push("/")
    }
  }, [router])

  if (!bookingData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-pulse">Loading booking details...</div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Booking", href: "/booking/details" },
    { label: "Details", href: "/booking/details" },
  ]

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BookingForm bookingData={bookingData} />
            </div>

            <div className="lg:col-span-1">
              <BookingSummary bookingData={bookingData} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
