"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Plane, User, Heart, Globe, ChevronDown, ChevronRight } from "lucide-react"
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
  }, [])

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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative overflow-hidden group hover:bg-accent/20"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <Menu className="w-5 h-5 relative z-10 group-hover:text-primary transition-colors duration-200" />
      </Button>
    </motion.div>
  </SheetTrigger>
  
  <SheetContent 
    side="right" 
    className="px-3 w-80 glass-card backdrop-blur-xl border-l border-white/20 bg-background/95"
  >
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center space-x-2 pt-4 pb-2 border-b border-white/10"
    >
      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
        <Plane className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Wanderlust
      </span>
    </motion.div>

    {/* Navigation Links */}
    <div className="flex flex-col space-y-2 mt-3">
      {[...navigation, ...moreLinks].map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.1 + (index * 0.05),
            ease: "easeOut"
          }}
        >
          <Link
            href={item.href}
            className="group relative flex items-center justify-between py-2 px-4 shadow-lg text-lg font-medium text-foreground/80 hover:text-foreground transition-all duration-300 hover:bg-accent/10 hover:shadow-md"
          >
            <span className="relative z-10">{item.name}</span>
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100"
              layoutId={`mobile-menu-bg-${item.name}`}
              transition={{ duration: 0.2 }}
            />
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 border border-primary/20 rounded-lg opacity-0 group-hover:opacity-100"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Arrow indicator */}
            <motion.div
              className="text-primary/60 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0"
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>

    {/* User Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className=" pt-6 border-t border-white/10 space-y-3"
    >
      {/* Currency/Language */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-white/5">
        <div className="flex items-center space-x-2 text-sm text-foreground/60">
          <Globe className="w-4 h-4" />
          <span>{currency}</span>
          <span>|</span>
          <span>{language.toUpperCase()}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-foreground/40" />
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="ghost" 
            className="w-full justify-start h-12 text-base hover:bg-accent/20 group"
          >
            <Heart className="w-5 h-5 mr-3 group-hover:text-red-500 transition-colors" />
            Wishlist
            <motion.div
              className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {user ? (
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 text-base hover:bg-accent/20 group"
            >
              <User className="w-5 h-5 mr-3 group-hover:text-primary transition-colors" />
              Account
              <motion.div
                className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Button>
          ) : (
            <Button 
              className="w-full h-12 text-base gradient-primary text-white hover:shadow-lg transition-all duration-300 group"
            >
              <User className="w-5 h-5 mr-3" />
              Sign In
              <motion.div
                className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>

    {/* Footer */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="absolute bottom-6 left-6 right-6 text-center"
    >
      <p className="text-xs text-foreground/40">
        Discover the world with Wanderlust
      </p>
    </motion.div>
  </SheetContent>
</Sheet>



          </div>
        </div>
      </div>
    </motion.header>
  )
}