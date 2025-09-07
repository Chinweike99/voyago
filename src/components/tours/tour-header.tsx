"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export function ToursHeader() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <MapPin className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Guided Tours &
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Adventures
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join expert-led tours and immersive experiences that reveal the hidden gems and cultural treasures of
            destinations around the world.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
