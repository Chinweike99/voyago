"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Download, Mail, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingConfirmation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("bookingConfirmation")
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [])

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading confirmation...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Your adventure awaits. We&apos;ve sent a confirmation email to {bookingData.email}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmation Number:</span>
                  <span className="font-semibold">{bookingData.confirmationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="font-semibold">{new Date(bookingData.bookingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600 capitalize">{bookingData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-2xl">${bookingData.totalPrice?.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Trip Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">{bookingData.destination || bookingData.title}</p>
                    <p className="text-gray-600 text-sm">{bookingData.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {bookingData.checkIn} - {bookingData.checkOut}
                    </p>
                    <p className="text-gray-600 text-sm">{bookingData.duration} days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">{bookingData.guests} Guests</p>
                    <p className="text-gray-600 text-sm">
                      {bookingData.adults} Adults, {bookingData.children} Children
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center space-y-4"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Confirmation
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Mail className="w-4 h-4" />
              Email Confirmation
            </Button>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;ll send you updates about your booking and travel tips to help you prepare for your trip. If you have any
            questions, our support team is available 24/7.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
