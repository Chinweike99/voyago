"use client"

import { motion } from "framer-motion"
import { FeaturedDestinations } from "@/components/home/featured-destinations"
import { PopularCategories } from "@/components/home/popular-categories"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { HeroSection } from "@/components/home/hero"
import { TestimonialsSection } from "@/components/home/testimonial-sections"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <PopularCategories />
        <FeaturedDestinations />
        <WhyChooseUs />
        <TestimonialsSection />
      </motion.div>
    </div>
  )
}
