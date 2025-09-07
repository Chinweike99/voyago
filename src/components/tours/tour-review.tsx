"use client"

import { motion } from "framer-motion"
import { Star, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface TourReviewsProps {
  tourId: string
}

export function TourReviews({ tourId }: TourReviewsProps) {
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: { name: "Alex Thompson", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 5,
      date: "2024-01-20",
      comment:
        "Incredible experience! Our guide was knowledgeable and the views were absolutely breathtaking. Highly recommend this tour.",
      helpful: 18,
    },
    {
      id: 2,
      user: { name: "Maria Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 5,
      date: "2024-01-15",
      comment:
        "Perfect tour for adventure seekers. Well organized, great group size, and amazing photo opportunities throughout.",
      helpful: 12,
    },
    {
      id: 3,
      user: { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great tour overall. The itinerary was well-planned and we saw some amazing sights. Only wish it was a bit longer!",
      helpful: 9,
    },
  ]

  console.log(tourId)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Tour Reviews</CardTitle>
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
