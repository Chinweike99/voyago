"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, CalendarIcon, Users, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

export function SearchForm() {
  const router = useRouter()
  const { setSearchFilters } = useAppStore()
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)

    // Update global search filters
    setSearchFilters({
      destination,
      checkIn: checkIn?.toISOString(),
      checkOut: checkOut?.toISOString(),
      guests: Number.parseInt(guests),
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const params = new URLSearchParams()
    if (destination) params.set("destination", destination)
    if (checkIn) params.set("checkIn", checkIn.toISOString())
    if (checkOut) params.set("checkOut", checkOut.toISOString())
    params.set("guests", guests)

    router.push(`/explore?${params.toString()}`)
    setIsLoading(false)
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="glass-card rounded-2xl p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Where to?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search destinations..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/50 focus:bg-background"
              />
            </div>
          </motion.div>

          {/* Check-in */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-background/50 border-border/50 hover:bg-primary",
                    !checkIn && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-card" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Check-out */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-background/50 border-border/50 hover:bg-primary",
                    !checkOut && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-card" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Guests */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Guests</label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="h-12 bg-background/50 border-border/50">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Search Button */}
        <motion.div className="mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full h-14 text-lg font-semibold gradient-primary text-white hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search Adventures
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
