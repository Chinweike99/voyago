"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeftRight, CalendarIcon, Users, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function FlightSearch() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departure, setDeparture] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")
  const [tripType, setTripType] = useState("roundtrip")

  const swapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        {/* Trip Type */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={tripType === "roundtrip" ? "default" : "ghost"}
            onClick={() => setTripType("roundtrip")}
            className="rounded-full"
          >
            Round Trip
          </Button>
          <Button
            variant={tripType === "oneway" ? "default" : "ghost"}
            onClick={() => setTripType("oneway")}
            className="rounded-full"
          >
            One Way
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* From */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground/70 mb-2">From</label>
            <Input
              placeholder="Departure city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Swap button */}
          <div className="flex items-end justify-center pb-2">
            <motion.button
              onClick={swapLocations}
              className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeftRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* To */}
          <div className="relative">
            <label className="block text-sm font-medium text-foreground/70 mb-2">To</label>
            <Input placeholder="Destination city" value={to} onChange={(e) => setTo(e.target.value)} className="h-12" />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Departure</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !departure && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departure ? format(departure, "MMM dd") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 glass-card" align="start">
                <Calendar
                  mode="single"
                  selected={departure}
                  onSelect={setDeparture}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          {tripType === "roundtrip" && (
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Return</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => date < (departure || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">Passengers</label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="h-12">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <motion.div className="mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full h-14 text-lg font-semibold gradient-primary text-white">
            <Search className="w-5 h-5 mr-2" />
            Search Flights
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}
