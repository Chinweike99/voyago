"use client"

import { useState } from "react"
import { motion } from "framer-motion"
// import { SearchForm } from "./search-form"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { SearchForm } from "./search-form"
import Image from "next/image"


export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0 "
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 backdrop-blur-xs bg-gradient-to-br from-primary/30 via-transparent to-secondary/20 z-10" />
        <Image
          src="/beach.jpg"
          alt="Luxury tropical destination"
          className="w-full h-full object-cover"
           width={150}
            height={150}
              sizes="100vw"
        />
      </motion.div>
    <span className="hidden">{showVideo}</span>
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center my-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-28"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Dream Destination
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl bg-black/20 shadow-2xl rounded-lg p-2 text-white mb-8 text-pretty max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Embark on extraordinary journeys with our curated luxury travel experiences. From pristine beaches to
            cultural wonders, your perfect adventure awaits.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button
              size="lg"
              className="gradient-primary text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
            >
              Start Exploring
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="gradient-primary text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
              onClick={() => setShowVideo(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video
            </Button>
          </motion.div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <SearchForm />
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  )
}
