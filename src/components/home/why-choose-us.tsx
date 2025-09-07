"use client"

import { motion } from "framer-motion"
import { Shield, Award, Clock, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Trusted & Secure",
    description: "Your bookings are protected with industry-leading security and our satisfaction guarantee.",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized globally for exceptional customer service and curated travel experiences.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance from our travel experts, wherever your journey takes you.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Experience",
    description: "Tailored recommendations and custom itineraries designed just for your preferences.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Why Choose
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Wanderlust
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We&apos;re committed to making your travel dreams come true with unparalleled service and attention to detail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>

              <p className="text-muted-foreground text-pretty">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
