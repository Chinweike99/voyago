"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Star, Heart, Settings, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    memberSince: "2023",
    totalBookings: 12,
    totalReviews: 8,
    wishlistCount: 15,
  })

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      type: "hotel",
      title: "Luxury Beach Resort",
      location: "Maldives",
      date: "2024-02-15",
      status: "confirmed",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      type: "tour",
      title: "Northern Lights Adventure",
      location: "Iceland",
      date: "2024-01-20",
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      type: "flight",
      title: "Round Trip to Tokyo",
      location: "Japan",
      date: "2023-12-10",
      status: "completed",
      image: "/placeholder.svg?height=60&width=60",
    },
  ])

  const [stats, setStats] = useState([
    { label: "Total Bookings", value: user.totalBookings, icon: Calendar },
    { label: "Reviews Written", value: user.totalReviews, icon: Star },
    { label: "Wishlist Items", value: user.wishlistCount, icon: Heart },
    { label: "Countries Visited", value: 8, icon: MapPin },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="text-gray-600">Member since {user.memberSince}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/account/profile">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>
        <div className="hidden">
          <p onClick={()=>setUser(user)}></p>
          <button onClick={()=>setRecentBookings(recentBookings)}></button>
          <button onClick={()=>setStats(stats)}></button>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-primary opacity-60" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Link href="/account/bookings">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Image
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.title}
                          className="w-16 h-16 rounded-lg object-cover"
                          height={8}
                          width={8}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{booking.title}</h3>
                          <p className="text-gray-600 text-sm">{booking.location}</p>
                          <p className="text-gray-500 text-xs">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Wishlist</CardTitle>
                  <Link href="/wishlist">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Your wishlist items will appear here</p>
                    <Link href="/explore">
                      <Button className="mt-4">Start Exploring</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">You haven&apos;t written any reviews yet</p>
                    <p className="text-gray-500 text-sm mt-2">Share your experiences to help other travelers</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
