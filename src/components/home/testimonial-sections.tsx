"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "/professional-woman-smiling-headshot.png",
    rating: 5,
    comment:
      "Wanderlust made our honeymoon in Santorini absolutely magical. Every detail was perfect, from the luxury hotel to the private sunset tour. Highly recommended!",
    trip: "Santorini Honeymoon Package",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    avatar: "/asian-businessman-smiling-headshot.jpg",
    rating: 5,
    comment:
      "The cultural tour of Bali exceeded all expectations. Our guide was knowledgeable and the temples were breathtaking. Will definitely book again!",
    trip: "Bali Cultural Experience",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    avatar: "/spanish-woman-smiling-headshot.jpg",
    rating: 5,
    comment:
      "Outstanding service from start to finish. The 24/7 support was incredibly helpful when we needed to change our flight. True professionals!",
    trip: "European Adventure Tour",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            What Our Travelers
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="glass-card border-0 h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-primary/30 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">&quot;{testimonial.comment}&quot;</p>

                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <p className="text-xs text-primary font-medium mt-1">{testimonial.trip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
