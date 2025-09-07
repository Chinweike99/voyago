export interface Destination {
  id: string
  name: string
  country: string
  description: string
  image: string
  rating: number
  reviewCount: number
  coordinates: {
    lat: number
    lng: number
  }
  highlights: string[]
  bestTimeToVisit: string
}

export interface Hotel {
  id: string
  name: string
  destination: string
  description: string
  images: string[]
  rating: number
  reviewCount: number
  pricePerNight: number
  currency: string
  amenities: string[]
  coordinates: {
    lat: number
    lng: number
  }
  availability: boolean
  roomTypes: RoomType[]
  location: string;
}

export interface RoomType {
  id: string
  name: string
  description: string
  price: number
  maxGuests: number
  amenities: string[]
  images: string[]
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: {
    airport: string
    city: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    city: string
    time: string
    date: string
  }
  duration: string
  price: number
  currency: string
  class: "economy" | "business" | "first"
  stops: number
}

export interface Tour {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location(id: string, location: any): unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any
  id: string
  name: string
  destination: string
  description: string
  images: string[]
  duration: string
  price: number
  currency: string
  rating: number
  reviewCount: number
  maxGroupSize: number
  difficulty: "easy" | "moderate" | "challenging"
  includes: string[]
  highlights: string[]
  itinerary: ItineraryDay[]
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  preferences: {
    currency: string
    language: string
  }
  wishlist: string[]
}

export interface SearchFilters {
  destination?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  priceRange?: [number, number]
  rating?: number
  amenities?: string[]
}
