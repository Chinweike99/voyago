"use client"

import { motion } from "framer-motion"
import { Heart, Trash2, Share2, Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useStore } from "@/lib/store"
import Image from "next/image"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useStore()

  const handleRemove = (id: string) => {
    removeFromWishlist(id)
  }

  const handleShare = () => {
 
    navigator.share?.({
      title: "My Travel Wishlist",
      text: "Check out my travel wishlist!",
      url: window.location.href,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            {wishlist.length > 0 && (
              <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share Wishlist
              </Button>
            )}
          </div>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring and save your favorite destinations, hotels, and tours to your wishlist.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/explore">
                <Button>Explore Destinations</Button>
              </Link>
              <Link href="/hotels">
                <Button variant="outline">Browse Hotels</Button>
              </Link>
              <Link href="/tours">
                <Button variant="outline">Find Tours</Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {wishlist.map((item:any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={item.image || item.images?.[0] || "/placeholder.svg"}
                      alt={item.title || item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      width={100}
                      height={22}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                    <Badge className="absolute bottom-3 left-3" variant="secondary">
                      {item.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title || item.name}</h3>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{item.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-xl font-bold text-primary">
                          ${item.price || item.pricePerNight}
                          <span className="text-sm font-normal text-gray-600">
                            {item.type === "hotel" ? "/night" : item.type === "tour" ? "/person" : ""}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/${item.type === "destination" ? "destinations" : `${item.type}s`}/${item.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
