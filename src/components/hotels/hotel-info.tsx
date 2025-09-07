"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Users, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HotelInfoProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hotel: any
}

export function HotelInfo({ hotel }: HotelInfoProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>About This Hotel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>

              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Check-in</p>
                    <p className="text-sm text-gray-600">3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Max Guests</p>
                    <p className="text-sm text-gray-600">{hotel.maxGuests} guests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Hotel Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {hotel.fullAmenities?.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms">
          <div className="grid gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {hotel.roomTypes?.map((room: any, index: number) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{room.name}</h3>
                      <p className="text-gray-600">{room.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>{room.size} sq ft</span>
                        <span>Max {room.maxGuests} guests</span>
                        <span>{room.bedType}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ${room.price}
                        <span className="text-sm font-normal text-gray-600">/night</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="location">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Location & Nearby</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Placeholder</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Nearby Attractions</h4>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {hotel.nearbyAttractions?.map((attraction: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{attraction.name}</span>
                    <span className="text-sm text-gray-600">{attraction.distance}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
