"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, ArrowRight } from "lucide-react"

const mockFlights = [
  {
    id: "1",
    airline: "Premium Airways",
    flightNumber: "PA 1234",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "08:30",
      date: "2024-03-15",
    },
    arrival: {
      airport: "CDG",
      city: "Paris",
      time: "21:45",
      date: "2024-03-15",
    },
    duration: "7h 15m",
    price: 899,
    currency: "USD",
    class: "economy" as const,
    stops: 0,
  },
  {
    id: "2",
    airline: "Global Connect",
    flightNumber: "GC 5678",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "14:20",
      date: "2024-03-15",
    },
    arrival: {
      airport: "CDG",
      city: "Paris",
      time: "04:35",
      date: "2024-03-16",
    },
    duration: "8h 15m",
    price: 749,
    currency: "USD",
    class: "economy" as const,
    stops: 1,
  },
]

export function FlightResults() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {mockFlights.length} Flight{mockFlights.length !== 1 ? "s" : ""} Found
        </h2>
      </div>

      <div className="space-y-4">
        {mockFlights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="glass-card border-0 overflow-hidden hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    {/* Airline */}
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Plane className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium">{flight.airline}</p>
                      <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
                    </div>

                    {/* Flight Details */}
                    <div className="flex items-center space-x-6">
                      {/* Departure */}
                      <div className="text-center">
                        <p className="text-2xl font-bold">{flight.departure.time}</p>
                        <p className="text-sm text-muted-foreground">{flight.departure.airport}</p>
                        <p className="text-xs text-muted-foreground">{flight.departure.city}</p>
                      </div>

                      {/* Duration */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <div className="w-16 h-px bg-border" />
                          <ArrowRight className="w-4 h-4" />
                          <div className="w-16 h-px bg-border" />
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{flight.duration}</span>
                        </div>
                        {flight.stops > 0 && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {flight.stops} stop{flight.stops > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>

                      {/* Arrival */}
                      <div className="text-center">
                        <p className="text-2xl font-bold">{flight.arrival.time}</p>
                        <p className="text-sm text-muted-foreground">{flight.arrival.airport}</p>
                        <p className="text-xs text-muted-foreground">{flight.arrival.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price and Book */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-2">${flight.price}</div>
                    <p className="text-sm text-muted-foreground mb-4 capitalize">{flight.class} class</p>
                    <Button className="gradient-primary text-white">Select Flight</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
