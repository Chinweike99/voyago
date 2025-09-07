import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"

// Configure Afacad font
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Wanderlust - Luxury Travel & Tourism Platform",
  description:
    "Discover extraordinary destinations and create unforgettable memories with our curated travel experiences.",
  generator: "v0.app",
  keywords: "travel, tourism, luxury travel, destinations, hotels, flights, tours",
  authors: [{ name: "Wanderlust Team" }],
  openGraph: {
    title: "Wanderlust - Luxury Travel & Tourism Platform",
    description:
      "Discover extraordinary destinations and create unforgettable memories with our curated travel experiences.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}