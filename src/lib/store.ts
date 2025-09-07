import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, SearchFilters } from "./types"

interface WishlistItem {
  id: string
  name?: string
  title?: string
  location: string
  image?: string
  images?: string[]
  rating?: number
  price?: number
  pricePerNight?: number
  type: "destination" | "hotel" | "tour"
}

interface AppState {
  user: User | null
  wishlist: WishlistItem[]
  searchFilters: SearchFilters
  currency: string
  language: string

  // Actions
  setUser: (user: User | null) => void
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (itemId: string) => void
  setSearchFilters: (filters: SearchFilters) => void
  setCurrency: (currency: string) => void
  setLanguage: (language: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      wishlist: [],
      searchFilters: {},
      currency: "USD",
      language: "en",

      setUser: (user) => set({ user }),

      addToWishlist: (item) => {
        const { wishlist } = get()
        if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
          set({ wishlist: [...wishlist, item] })
        }
      },

      removeFromWishlist: (itemId) => {
        const { wishlist } = get()
        set({ wishlist: wishlist.filter((item) => item.id !== itemId) })
      },

      setSearchFilters: (filters) => set({ searchFilters: filters }),
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "travel-app-storage",
    },
  ),
)

export const useStore = useAppStore
