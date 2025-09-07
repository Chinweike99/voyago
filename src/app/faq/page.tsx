"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Search, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: HelpCircle,
      questions: [
        {
          id: "booking-1",
          question: "How do I make a booking?",
          answer:
            "You can make a booking by browsing our destinations, hotels, or tours, selecting your preferred option, and following the booking process. You'll need to provide your travel dates, number of guests, and payment information.",
        },
        {
          id: "booking-2",
          question: "Can I modify or cancel my booking?",
          answer:
            "Yes, you can modify or cancel most bookings through your account dashboard. Cancellation policies vary by provider and booking type. Free cancellation is available for many bookings up to 24-48 hours before your travel date.",
        },
        {
          id: "booking-3",
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.",
        },
        {
          id: "booking-4",
          question: "Will I receive a confirmation?",
          answer:
            "Yes, you'll receive an email confirmation immediately after booking, along with all necessary details including confirmation numbers, contact information, and any special instructions.",
        },
      ],
    },
    {
      title: "Travel & Safety",
      icon: HelpCircle,
      questions: [
        {
          id: "travel-1",
          question: "What safety measures are in place?",
          answer:
            "We work only with verified partners who meet our strict safety standards. All accommodations and tour operators are regularly audited, and we provide 24/7 customer support during your travels.",
        },
        {
          id: "travel-2",
          question: "Do I need travel insurance?",
          answer:
            "While not mandatory, we highly recommend travel insurance to protect against unexpected events like trip cancellations, medical emergencies, or lost luggage. We can help you find suitable coverage.",
        },
        {
          id: "travel-3",
          question: "What if there's an emergency during my trip?",
          answer:
            "Our 24/7 emergency support team is always available to assist you. Contact us immediately through our emergency hotline, and we'll help coordinate any necessary assistance or changes to your itinerary.",
        },
        {
          id: "travel-4",
          question: "Are your tour guides certified?",
          answer:
            "Yes, all our tour guides are licensed professionals with extensive local knowledge. They undergo regular training and are fluent in multiple languages to ensure the best possible experience.",
        },
      ],
    },
    {
      title: "Pricing & Refunds",
      icon: HelpCircle,
      questions: [
        {
          id: "pricing-1",
          question: "Are there any hidden fees?",
          answer:
            "No, we believe in transparent pricing. All fees, taxes, and charges are clearly displayed during the booking process. The final price you see is exactly what you'll pay.",
        },
        {
          id: "pricing-2",
          question: "How do refunds work?",
          answer:
            "Refunds are processed according to the cancellation policy of each booking. Most refunds are processed within 5-10 business days to your original payment method. Some bookings may have non-refundable components.",
        },
        {
          id: "pricing-3",
          question: "Can I get a price match?",
          answer:
            "We offer competitive pricing and will consider price matching for identical bookings found elsewhere. Contact our customer service team with details of the competing offer for review.",
        },
        {
          id: "pricing-4",
          question: "Do you offer group discounts?",
          answer:
            "Yes, we offer special rates for groups of 10 or more people. Contact our group booking specialists for customized packages and pricing for your group travel needs.",
        },
      ],
    },
    {
      title: "Account & Technical",
      icon: HelpCircle,
      questions: [
        {
          id: "account-1",
          question: "How do I create an account?",
          answer:
            "Click the 'Sign Up' button in the top right corner of any page. You can register with your email address or use your Google/Facebook account for quick registration.",
        },
        {
          id: "account-2",
          question: "I forgot my password. What should I do?",
          answer:
            "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure link to reset your password. If you don't receive the email, check your spam folder.",
        },
        {
          id: "account-3",
          question: "How do I update my profile information?",
          answer:
            "Log into your account and go to 'Profile Settings' where you can update your personal information, preferences, and notification settings. Changes are saved automatically.",
        },
        {
          id: "account-4",
          question: "Is my personal information secure?",
          answer:
            "Absolutely. We use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent.",
        },
      ],
    },
  ]

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl mt-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about booking, travel, and our services
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 text-lg"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                              <h3 className="text-left font-semibold text-gray-900">{faq.question}</h3>
                              <ChevronDown
                                className={`w-5 h-5 text-gray-500 transition-transform ${
                                  openItems.includes(faq.id) ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 pt-2">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && searchQuery && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any questions matching &apos;{searchQuery}&apos;. Try different keywords or contact us directly.
            </p>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">Our friendly support team is here to help you 24/7</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="flex items-center gap-2 min-w-[160px]">
                    <MessageCircle className="w-4 h-4" />
                    Live Chat
                  </Button>
                </Link>
                <Button variant="outline" className="flex items-center gap-2 min-w-[160px] bg-transparent">
                  <Mail className="w-4 h-4" />
                  Email Support
                </Button>
                <Button variant="outline" className="flex items-center gap-2 min-w-[160px] bg-transparent">
                  <Phone className="w-4 h-4" />
                  Call Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
