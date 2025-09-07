"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Plane, User, Heart, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

const navigation = [
  { name: "Home", href: "/" },
//   { name: "Explore", href: "/explore" },
  { name: "Hotels", href: "/hotels" },
  { name: "Flights", href: "/flight" },
  { name: "Tours", href: "/tours" },
  { name: "Blog", href: "/blog" },
]

const moreLinks = [
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const { user, currency, language } = useAppStore()

  // Handle scroll effect - Fixed: Use useEffect instead of useState
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    // Add event listener
    window.addEventListener("scroll", handleScroll)
    
    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Empty dependency array means this runs once after mount

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-card shadow-lg backdrop-blur-lg" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plane className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Wanderlust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"
                  layoutId="navbar-indicator"
                />
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 glass-card rounded-lg shadow-lg py-2"
                  >
                    {moreLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Currency/Language */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-foreground/60">
              <Globe className="w-4 h-4" />
              <span>{currency}</span>
              <span>|</span>
              <span>{language.toUpperCase()}</span>
            </div>

            {/* User actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>

              {user ? (
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              ) : (
                <Button size="sm" className="gradient-primary text-white">
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {[...navigation, ...moreLinks].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}