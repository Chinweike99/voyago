import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, MapPin, CreditCard } from "lucide-react"

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

interface BookingSummaryProps {
  bookingData: BookingData
}

export function BookingSummary({ bookingData }: BookingSummaryProps) {
  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkInDate = new Date(bookingData.checkIn)
      const checkOutDate = new Date(bookingData.checkOut)
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays)
      
      // Calculate total with basic pricing (you can extend this with taxes, fees, etc.)
      const subtotal = bookingData.basePrice * diffDays
      const serviceFee = subtotal * 0.12 // 12% service fee
      const taxes = subtotal * 0.08 // 8% taxes
      setTotalPrice(subtotal + serviceFee + taxes)
    } else {
      setNights(1)
      setTotalPrice(bookingData.basePrice)
    }
  }, [bookingData])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Select date"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: bookingData.currency || "USD"
    }).format(amount)
  }

  const subtotal = bookingData.basePrice * nights
  const serviceFee = subtotal * 0.12
  const taxes = subtotal * 0.08

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-20"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Booking Summary</h2>

      {/* Item Details */}
      <div className="mb-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {bookingData.itemName}
            </h3>
            <p className="text-sm text-gray-500 capitalize mt-1">
              {bookingData.type}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-4 mb-6">
        {bookingData.checkIn && bookingData.checkOut && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Dates</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {formatDate(bookingData.checkIn)}
              </div>
              <div className="text-xs text-gray-500">to</div>
              <div className="text-sm font-medium text-gray-900">
                {formatDate(bookingData.checkOut)}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Guests</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
          </span>
        </div>

        {nights > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Duration</span>
            <span className="text-sm font-medium text-gray-900">
              {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <CreditCard className="w-4 h-4 mr-2" />
          Price Details
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {formatCurrency(bookingData.basePrice)} × {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
            <span className="text-gray-900">{formatCurrency(subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Service fee</span>
            <span className="text-gray-900">{formatCurrency(serviceFee)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes</span>
            <span className="text-gray-900">{formatCurrency(taxes)}</span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>

      {/* Booking Notes */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          Your booking will be confirmed immediately after payment. You&apos;ll receive a confirmation email with all the details.
        </p>
      </div>
    </motion.div>
  )
}