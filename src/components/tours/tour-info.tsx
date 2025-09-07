"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Users, Check, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TourInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tour: any
}

export function TourInfo({ tour }: TourInfoProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="included">What&apos;s Included</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Tour Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>

              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-sm text-gray-600">{tour.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <p className="text-sm text-gray-600">Max {tour.maxGroupSize} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Meeting Point</p>
                    <p className="text-sm text-gray-600">{tour.meetingPoint}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itinerary">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Tour Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {tour.itinerary?.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="included">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-green-600">What&apos;s Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tour.included?.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-red-600">Not Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tour.notIncluded?.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 border border-red-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-0.5 bg-red-600"></div>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Available Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {tour.availableDates?.map((date: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-semibold">{date.date}</p>
                        <p className="text-sm text-gray-600">{date.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${date.price}</p>
                      <p className="text-xs text-gray-600">{date.spotsLeft} spots left</p>
                    </div>
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
