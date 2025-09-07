"use client"

import type React from "react"

import { useState } from "react"
import { Star, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (review: any) => void
}

export function WriteReviewModal({ isOpen, onClose, item, onSubmit }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [photos, setPhotos] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const review = {
      id: Date.now().toString(),
      itemId: item.id,
      itemType: item.type,
      rating,
      title,
      comment,
      photos,
      date: new Date().toISOString(),
      user: {
        name: "Sarah Johnson", // This would come from auth context
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }

    onSubmit(review)

    // Reset form
    setRating(0)
    setTitle("")
    setComment("")
    setPhotos([])
    onClose()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you'd upload these to a server
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setPhotos([...photos, ...newPhotos])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={item.image || item.images?.[0] || "/placeholder.svg"}
              alt={item.title || item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">{item.title || item.name}</h3>
              <p className="text-gray-600 text-sm">{item.location}</p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label>Overall Rating</Label>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && (
                  <>
                    {rating} star{rating !== 1 ? "s" : ""}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              required
            />
          </div>

          {/* Review Comment */}
          <div>
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details about your experience..."
              rows={5}
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <Label>Add Photos (Optional)</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <Camera className="w-4 h-4" />
                Add Photos
              </label>
            </div>

            {photos.length > 0 && (
              <div className="flex gap-2 mt-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-16 h-16 rounded-lg object-cover"
                      width={8}
                      height={8}
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={rating === 0 || !title.trim() || !comment.trim()}>
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
