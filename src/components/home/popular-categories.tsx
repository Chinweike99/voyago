"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Hotel, Plane, MapPin, Car } from "lucide-react"
import Image from "next/image"

const categories = [
  {
    title: "Luxury Hotels",
    description: "Premium accommodations worldwide",
    icon: Hotel,
    href: "/hotels",
    gradient: "from-blue-500 to-purple-600",
    image: "/hotels.jpg",
  },
  {
    title: "Flight Deals",
    description: "Best prices on flights globally",
    icon: Plane,
    href: "/flight",
    gradient: "from-emerald-500 to-teal-600",
    image: "/flight.jpg",
  },
  {
    title: "Guided Tours",
    description: "Expert-led cultural experiences",
    icon: MapPin,
    href: "/tours",
    gradient: "from-orange-500 to-red-600",
    image: "/tours.jpg",
  },
  {
    title: "Car Rentals",
    description: "Freedom to explore at your pace",
    icon: Car,
    href: "/cars",
    gradient: "from-purple-500 to-pink-600",
    image: "/cars.jpg",
  },
]

export function PopularCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Plan Your Perfect
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Travel Experience
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From luxury accommodations to unforgettable adventures, we have everything you need for your dream vacation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={category.href}>
                <Card className="glass-card py-0 border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={100}
                      height={100}
                      sizes="100vw"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50 group-hover:opacity-20 transition-opacity`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
