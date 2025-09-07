"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"
import type { SearchFilters } from "@/lib/types"

interface HotelsFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  resultCount: number
}

const amenities = [
  "Free WiFi",
  "Pool",
  "Spa",
  "Gym",
  "Restaurant",
  "Bar",
  "Room Service",
  "Concierge",
  "Parking",
  "Pet Friendly",
]

const hotelTypes = [
  "Luxury Hotel",
  "Boutique Hotel",
  "Resort",
  "Business Hotel",
  "Budget Hotel",
  "Hostel",
  "Apartment",
  "Villa",
]

export function HotelsFilters({  resultCount }: HotelsFiltersProps) {
  return (
    <Card className="glass-card sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </div>
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Price per night: $50 - $500</label>
          <Slider defaultValue={[50, 500]} max={1000} min={0} step={10} className="w-full" />
        </div>

        {/* Hotel Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Hotel Type</label>
          <div className="space-y-2">
            {hotelTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <label htmlFor={type} className="text-sm cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="text-sm font-medium mb-3 block">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {resultCount} hotel{resultCount !== 1 ? "s" : ""} found
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
