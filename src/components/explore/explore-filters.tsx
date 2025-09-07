"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Star } from "lucide-react"
import type { SearchFilters } from "@/lib/types"

interface ExploreFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  resultCount: number
}

const regions = ["Europe", "Asia", "Americas", "Africa", "Oceania", "Middle East"]

const highlights = [
  "Beaches",
  "Mountains",
  "Culture",
  "Adventure",
  "Nightlife",
  "Food & Wine",
  "History",
  "Nature",
  "Architecture",
  "Shopping",
]

export function ExploreFilters({ filters, onFiltersChange, resultCount }: ExploreFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.destination || "")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState([filters.rating || 0])

  const handleSearch = () => {
    onFiltersChange({
      ...filters,
      destination: searchTerm,
    })
  }

  const handleRatingChange = (value: number[]) => {
    setRatingFilter(value)
    onFiltersChange({
      ...filters,
      rating: value[0],
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedRegions([])
    setSelectedHighlights([])
    setRatingFilter([0])
    onFiltersChange({})
  }

  const activeFiltersCount = [
    filters.destination,
    filters.rating && filters.rating > 0,
    selectedRegions.length > 0,
    selectedHighlights.length > 0,
  ].filter(Boolean).length

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="glass-card sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search */}
          <div>
            <label className="text-sm font-medium mb-2 block">Search Destinations</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} size="sm">
                Go
              </Button>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Minimum Rating: {ratingFilter[0]}{" "}
              {ratingFilter[0] > 0 && <Star className="w-4 h-4 inline text-yellow-400 fill-yellow-400" />}
            </label>
            <Slider
              value={ratingFilter}
              onValueChange={handleRatingChange}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Any</span>
              <span>5.0</span>
            </div>
          </div>

          {/* Regions */}
          <div>
            <label className="text-sm font-medium mb-3 block">Regions</label>
            <div className="space-y-2">
              {regions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={region}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRegions([...selectedRegions, region])
                      } else {
                        setSelectedRegions(selectedRegions.filter((r) => r !== region))
                      }
                    }}
                  />
                  <label htmlFor={region} className="text-sm cursor-pointer">
                    {region}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="text-sm font-medium mb-3 block">Highlights</label>
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight) => (
                <Badge
                  key={highlight}
                  variant={selectedHighlights.includes(highlight) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => {
                    if (selectedHighlights.includes(highlight)) {
                      setSelectedHighlights(selectedHighlights.filter((h) => h !== highlight))
                    } else {
                      setSelectedHighlights([...selectedHighlights, highlight])
                    }
                  }}
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {resultCount} destination{resultCount !== 1 ? "s" : ""} found
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
