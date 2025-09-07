"use client"

import { motion } from "framer-motion"
import { Users, Globe, Award, Heart, MapPin, Plane, Camera, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Travelers", value: "50,000+" },
    { icon: Globe, label: "Destinations", value: "200+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Heart, label: "5-Star Reviews", value: "10,000+" },
  ]

  const values = [
    {
      icon: MapPin,
      title: "Authentic Experiences",
      description: "We curate genuine, local experiences that connect you with the heart and soul of each destination.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your safety is our priority. We partner with verified providers and maintain the highest standards.",
    },
    {
      icon: Plane,
      title: "Seamless Travel",
      description: "From booking to boarding, we make your travel experience smooth and hassle-free.",
    },
    {
      icon: Camera,
      title: "Memorable Moments",
      description: "We help you create unforgettable memories that will last a lifetime.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/professional-woman-ceo.png",
      bio: "Former travel journalist with 15 years of experience exploring the world.",
    },
    {
      name: "Marcus Chen",
      role: "Head of Operations",
      image: "/professional-man-operations.png",
      bio: "Operations expert who ensures every trip runs smoothly from start to finish.",
    },
    {
      name: "Emma Wilson",
      role: "Travel Experience Director",
      image: "/professional-woman-travel.jpg",
      bio: "Passionate about creating unique experiences that showcase local culture.",
    },
    {
      name: "David Kim",
      role: "Technology Lead",
      image: "/professional-man-technology.png",
      bio: "Tech innovator making travel planning easier through cutting-edge solutions.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 mt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting You to the
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> World</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe travel has the power to transform lives, broaden perspectives, and create lasting connections.
              Our mission is to make extraordinary travel experiences accessible to everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020 by a team of passionate travelers, WanderLust was born from a simple idea: travel
                  should be inspiring, accessible, and transformative for everyone.
                </p>
                <p>
                  After years of experiencing the challenges of travel planning firsthand, we set out to create a
                  platform that would eliminate the stress and uncertainty, while amplifying the joy and wonder of
                  discovering new places.
                </p>
                <p>
                  Today, we&apos;re proud to have helped over 50,000 travelers create unforgettable memories across 200+
                  destinations worldwide. But we&apos;re just getting started.
                </p>
              </div>
              <Link href="/contact">
                <Button className="mt-8">Get in Touch</Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Image 
              src="/team-working-together-travel-office.jpg" 
              alt="Our team" 
              className="rounded-2xl shadow-2xl" 
              width={20}
              height={20}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="glass-card h-full text-center">
                    <CardContent className="p-8">
                      <value.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card className="glass-card overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                      width={20}
                      height={20}
                      sizes="100vw"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <Card className="glass-card">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of travelers who trust us to make their dream trips a reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/explore">
                    <Button size="lg" className="min-w-[200px]">
                      Explore Destinations
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

