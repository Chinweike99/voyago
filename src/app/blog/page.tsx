"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, User, Clock, ArrowRight, Search, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Southeast Asia You Must Visit",
      excerpt: "Discover breathtaking destinations off the beaten path that will transform your travel experience.",
      image: "/southAsia.jpg",
      author: "Emma Wilson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "destinations",
      tags: ["Southeast Asia", "Hidden Gems", "Adventure"],
    },
    {
      id: 2,
      title: "The Ultimate Guide to Budget Travel in Europe",
      excerpt: "Learn how to explore Europe's most beautiful cities without breaking the bank.",
      image: "/europe.jpg",
      author: "Marcus Chen",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "tips",
      tags: ["Europe", "Budget Travel", "Tips"],
    },
    {
      id: 3,
      title: "Sustainable Tourism: How to Travel Responsibly",
      excerpt: "Make a positive impact while exploring the world with these eco-friendly travel practices.",
      image: "/ecoTravel.jpg",
      author: "Sarah Green",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "sustainability",
      tags: ["Eco Travel", "Sustainability", "Responsible Tourism"],
    },
    {
      id: 4,
      title: "Best Photography Spots Around the World",
      excerpt: "Capture stunning memories at these Instagram-worthy locations that will amaze your followers.",
      image: "/photo.jpg",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "photography",
      tags: ["Photography", "Instagram", "Scenic Views"],
    },
    {
      id: 5,
      title: "Cultural Etiquette: Respecting Local Customs While Traveling",
      excerpt: "Navigate different cultures with confidence and respect using these essential guidelines.",
      image: "/culture.jpg",
      author: "Aisha Patel",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "culture",
      tags: ["Culture", "Etiquette", "Local Customs"],
    },
    {
      id: 6,
      title: "Solo Female Travel: Safety Tips and Empowering Destinations",
      excerpt: "Embark on solo adventures with confidence using our comprehensive safety guide.",
      image: "/femaleTravel.jpg",
      author: "Lisa Rodriguez",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "solo-travel",
      tags: ["Solo Travel", "Female Travel", "Safety"],
    },
  ]

  const categories = [
    { id: "all", name: "All Posts", count: blogPosts.length },
    { id: "destinations", name: "Destinations", count: 1 },
    { id: "tips", name: "Travel Tips", count: 1 },
    { id: "sustainability", name: "Sustainability", count: 1 },
    { id: "photography", name: "Photography", count: 1 },
    { id: "culture", name: "Culture", count: 1 },
    { id: "solo-travel", name: "Solo Travel", count: 1 },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 ">
      <div className="container mx-auto px-4 max-w-7xl mt-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Travel Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover inspiring stories, expert tips, and hidden gems from around the world
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card py-0 overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                  width={150}
                  height={150}
                  sizes="100vw"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4" variant="secondary">
                  Featured
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.id}`}>
                  <Button className="flex items-center gap-2">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Search */}
            <Card className="glass-card  mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Search Posts</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-70">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass-card py-0 overflow-hidden group hover:shadow-lg transition-shadow h-full">
                    <div className="relative">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        width={150}
                        height={150}
                        sizes="100vw"
                      />
                      <Badge className="absolute top-3 left-3" variant="secondary">
                        {categories.find((c) => c.id === post.category)?.name}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>

                      <Link href={`/blog/${post.id}`} className="mt-4">
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                        >
                          Read Article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
