"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Users, Star, Shield, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Destination, Hotel, Tour } from "@/lib/types"

interface BookingWidgetProps {
  type: "destination" | "hotel" | "tour"
  item: Destination | Hotel | Tour
  basePrice: number
  currency: string
}

export function BookingWidget({ type, item, basePrice, currency }: BookingWidgetProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [isLoading, setIsLoading] = useState(false)

  const handleBooking = async () => {
    setIsLoading(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Navigate to booking flow
    const bookingData = {
      type,
      itemId: item.id,
      itemName: item.name,
      checkIn: checkIn?.toISOString(),
      checkOut: checkOut?.toISOString(),
      guests: Number.parseInt(guests),
      basePrice,
      currency,
    }

    localStorage.setItem("currentBooking", JSON.stringify(bookingData))
    router.push("/booking/details")

    setIsLoading(false)
  }

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const totalPrice = basePrice * nights * Number.parseInt(guests)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-24"
    >
      <Card className="glass-card shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Book Your {type === "destination" ? "Trip" : type === "hotel" ? "Stay" : "Tour"}</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${basePrice}
                <span className="text-sm font-normal text-muted-foreground">
                  /{type === "hotel" ? "night" : type === "tour" ? "person" : "day"}
                </span>
              </div>
              {"rating" in item && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM dd") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    disabled={(date: any) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "MMM dd") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    disabled={(date: any ) => date < (checkIn || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm font-medium mb-2 block">Guests</label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Breakdown */}
          {checkIn && checkOut && (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>
                  ${basePrice} x {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span>${basePrice * nights}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Guests ({guests})</span>
                <span>x{guests}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}

          {/* Book Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleBooking}
              disabled={!checkIn || !checkOut || isLoading}
              className="w-full h-12 text-lg font-semibold gradient-primary text-white"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                "Reserve Now"
              )}
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Free cancellation up to 24 hours</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Instant confirmation</span>
            </div>
          </div>

          {/* Special Offers */}
          <div className="space-y-2">
            <Badge variant="secondary" className="w-full justify-center py-2">
              🎉 Book now and save 15% on your next trip!
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
