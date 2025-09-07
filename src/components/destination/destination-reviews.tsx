"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp } from "lucide-react"
// import { api } from "@/lib/api"
import type { Review } from "@/lib/types"
import { api } from "@/lib/app"

interface DestinationReviewsProps {
  destinationId: string
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "/professional-woman-smiling-headshot.png",
    rating: 5,
    comment:
      "Absolutely breathtaking! The sunset views were incredible and the local culture was so welcoming. Highly recommend visiting during the spring months.",
    date: "2024-02-15",
    helpful: 12,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Michael Chen",
    userAvatar: "/asian-businessman-smiling-headshot.jpg",
    rating: 4,
    comment:
      "Beautiful destination with amazing food and friendly locals. The only downside was the crowds during peak season, but still worth the visit.",
    date: "2024-01-28",
    helpful: 8,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emma Rodriguez",
    userAvatar: "/spanish-woman-smiling-headshot.jpg",
    rating: 5,
    comment:
      "Perfect honeymoon destination! The romantic atmosphere and stunning scenery made our trip unforgettable. We'll definitely be back!",
    date: "2024-01-10",
    helpful: 15,
  },
]

export function DestinationReviews({ destinationId }: DestinationReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true)
      try {
        const data = await api.getReviews(destinationId)
        setReviews(data.length > 0 ? data : mockReviews)
      } catch (error) {
        console.error("Failed to load reviews:", error)
        setReviews(mockReviews)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [destinationId])

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((review) => review.rating === rating).length,
  )

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-20 bg-muted rounded" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{reviews.length} reviews</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm w-3">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Progress value={(ratingDistribution[index] / reviews.length) * 100} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-8">{ratingDistribution[index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b border-border/50 pb-6 last:border-b-0"
            >
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                  <AvatarFallback>
                    {review.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3 leading-relaxed">{review.comment}</p>

                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          View All Reviews
        </Button>
      </CardContent>
    </Card>
  )
}
