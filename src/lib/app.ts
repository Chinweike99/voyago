import type { Destination, Hotel, Flight, Tour, Review } from "./types"

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data will be loaded from JSON files
let destinations: Destination[] = []
const hotels: Hotel[] = []
const flights: Flight[] = []
const tours: Tour[] = []
const reviews: Review[] = []

// Initialize mock data
const initializeData = async () => {
  // For now, we'll use hardcoded data until we create the JSON files
  destinations = [
    {
      id: "1",
      name: "Santorini",
      country: "Greece",
      description: "A stunning Greek island known for its white-washed buildings and breathtaking sunsets.",
      image: "/greece.jpg",
      rating: 4.8,
      reviewCount: 2847,
      coordinates: { lat: 36.3932, lng: 25.4615 },
      highlights: ["Sunset Views", "White Architecture", "Wine Tasting", "Volcanic Beaches"],
      bestTimeToVisit: "April to October",
    },
    {
      id: "2",
      name: "Bali",
      country: "Indonesia",
      description: "Tropical paradise with ancient temples, lush rice terraces, and pristine beaches.",
      image: "/indonesia.jpg",
      rating: 4.7,
      reviewCount: 3921,
      coordinates: { lat: -8.3405, lng: 115.092 },
      highlights: ["Rice Terraces", "Ancient Temples", "Beach Resorts", "Cultural Experiences"],
      bestTimeToVisit: "April to October",
    },
  ]
}

export const api = {
  // Destinations
  getDestinations: async (): Promise<Destination[]> => {
    await delay(300)
    if (destinations.length === 0) await initializeData()
    return destinations
  },

  getDestination: async (id: string): Promise<Destination | null> => {
    await delay(200)
    if (destinations.length === 0) await initializeData()
    return destinations.find((d) => d.id === id) || null
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHotels: async (filters?: any): Promise<Hotel[]> => {
    await delay(400)
    console.log(filters)
    return hotels
  },

  getHotel: async (id: string): Promise<Hotel | null> => {
    await delay(200)
    return hotels.find((h) => h.id === id) || null
  },

  getHotelById: async (id: string): Promise<Hotel | null> => {
    await delay(200)
    return hotels.find((h) => h.id === id) || null
  },

  getRelatedHotels: async (hotelId: string, limit = 4): Promise<Hotel[]> => {
    await delay(300)
    return hotels.filter((h) => h.id !== hotelId).slice(0, limit)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchFlights: async (filters?: any): Promise<Flight[]> => {
    console.log(filters)
    await delay(500)
    return flights
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTours: async (filters?: any): Promise<Tour[]> => {
    console.log(filters)
    await delay(350)
    return tours
  },

  getTour: async (id: string): Promise<Tour | null> => {
    await delay(200)
    return tours.find((t) => t.id === id) || null
  },

  getTourById: async (id: string): Promise<Tour | null> => {
    await delay(200)
    return tours.find((t) => t.id === id) || null
  },

  getRelatedTours: async (tourId: string, limit = 4): Promise<Tour[]> => {
    await delay(300)
    return tours.filter((t) => t.id !== tourId).slice(0, limit)
  },

  // Reviews
  getReviews: async (itemId: string): Promise<Review[]> => {
    await delay(250)
    return reviews.filter((r) => r.id.startsWith(itemId))
  },
}
