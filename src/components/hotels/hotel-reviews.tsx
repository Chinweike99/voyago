"use client"

import { motion } from "framer-motion"
import { Star, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface HotelReviewsProps {
  hotelId: string
}

export function HotelReviews({ hotelId }: HotelReviewsProps) {
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely stunning hotel with incredible service. The staff went above and beyond to make our stay memorable.",
      helpful: 12,
    },
    {
      id: 2,
      user: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great location and beautiful rooms. The breakfast was exceptional. Only minor issue was the wifi speed.",
      helpful: 8,
    },
    {
      id: 3,
      user: { name: "Emma Davis", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 5,
      date: "2024-01-05",
      comment:
        "Perfect for our honeymoon! The spa services were amazing and the sunset views from our room were breathtaking.",
      helpful: 15,
    },
  ]
   console.log(hotelId)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Guest Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {review.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.user.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
