"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Download, Mail, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import Link from "next/link"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import Image from "next/image"

export default function BookingsPage() {
  const [bookings] = useState([
    {
      id: "WL1704067200",
      type: "hotel",
      title: "Luxury Beach Resort",
      location: "Maldives",
      image: "/placeholder.svg?height=80&width=80",
      checkIn: "2024-03-15",
      checkOut: "2024-03-22",
      guests: 2,
      totalPrice: 3500,
      status: "confirmed",
      confirmationNumber: "WL1704067200",
    },
    {
      id: "WL1703462400",
      type: "tour",
      title: "Northern Lights Adventure",
      location: "Iceland",
      image: "/placeholder.svg?height=80&width=80",
      date: "2024-02-10",
      duration: "5 days",
      guests: 2,
      totalPrice: 1200,
      status: "completed",
      confirmationNumber: "WL1703462400",
    },
    {
      id: "WL1702857600",
      type: "flight",
      title: "Round Trip to Tokyo",
      location: "Japan",
      image: "/placeholder.svg?height=80&width=80",
      departure: "2024-01-15",
      return: "2024-01-25",
      passengers: 1,
      totalPrice: 850,
      status: "completed",
      confirmationNumber: "WL1702857600",
    },
  ])

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Account", href: "/account" },
    { label: "Bookings", href: "/account/bookings" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const upcomingBookings = bookings.filter((booking) => booking.status === "confirmed")
  const pastBookings = bookings.filter((booking) => booking.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumbs items={breadcrumbItems} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past Trips ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-6">
                {upcomingBookings.length === 0 ? (
                  <Card className="glass-card">
                    <CardContent className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
                      <p className="text-gray-600 mb-6">Ready for your next adventure?</p>
                      <Link href="/explore">
                        <Button>Start Planning</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  upcomingBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-6">
                            <Image
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.title}
                              className="w-20 h-20 rounded-lg object-cover"
                              height={10}
                              width={10}
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">{booking.title}</h3>
                                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{booking.location}</span>
                                  </div>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              </div>

                              <div className="grid md:grid-cols-3 gap-4 mb-4">
                                {booking.type === "hotel" && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <div>
                                        <p className="text-sm font-medium">Check-in</p>
                                        <p className="text-sm text-gray-600">
                                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                          {new Date(booking.checkIn as any).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <div>
                                        <p className="text-sm font-medium">Check-out</p>
                                        <p className="text-sm text-gray-600">
                                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                          {new Date(booking.checkOut as any).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-gray-500" />
                                      <div>
                                        <p className="text-sm font-medium">Guests</p>
                                        <p className="text-sm text-gray-600">{booking.guests} guests</p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-2xl font-bold text-primary">
                                    ${booking.totalPrice.toLocaleString()}
                                  </p>
                                  <p className="text-sm text-gray-600">Confirmation: {booking.confirmationNumber}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 bg-transparent"
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 bg-transparent"
                                  >
                                    <Mail className="w-4 h-4" />
                                    Email
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-6">
                {pastBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.title}
                            className="w-20 h-20 rounded-lg object-cover"
                            height={10}
                            width={10}
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">{booking.title}</h3>
                                <div className="flex items-center gap-1 text-gray-600 mt-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-2xl font-bold text-primary">
                                  ${booking.totalPrice.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">Confirmation: {booking.confirmationNumber}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                                  <Star className="w-4 h-4" />
                                  Write Review
                                </Button>
                                <Button variant="outline" size="sm">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
