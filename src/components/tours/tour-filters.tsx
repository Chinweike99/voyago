"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"
import type { SearchFilters } from "@/lib/types"

interface ToursFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  resultCount: number
}

const tourTypes = ["Cultural", "Adventure", "Food & Wine", "Historical", "Nature", "Photography", "Walking", "Private"]

const durations = ["Half Day", "Full Day", "2-3 Days", "4-7 Days", "1+ Week"]

const difficulties = ["Easy", "Moderate", "Challenging"]

export function ToursFilters({ resultCount }: ToursFiltersProps) {
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
          <label className="text-sm font-medium mb-3 block">Price: $25 - $500</label>
          <Slider defaultValue={[25, 500]} max={1000} min={0} step={25} className="w-full" />
        </div>

        {/* Tour Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Tour Type</label>
          <div className="flex flex-wrap gap-2">
            {tourTypes.map((type) => (
              <Badge key={type} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium mb-3 block">Duration</label>
          <div className="space-y-2">
            {durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox id={duration} />
                <label htmlFor={duration} className="text-sm cursor-pointer">
                  {duration}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-sm font-medium mb-3 block">Difficulty</label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox id={difficulty} />
                <label htmlFor={difficulty} className="text-sm cursor-pointer">
                  {difficulty}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {resultCount} tour{resultCount !== 1 ? "s" : ""} found
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
