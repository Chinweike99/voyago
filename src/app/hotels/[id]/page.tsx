import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { HotelHero } from "@/components/hotels/hotel-hero"
import { HotelInfo } from "@/components/hotels/hotel-info"
import { HotelReviews } from "@/components/hotels/hotel-reviews"
import { RelatedHotels } from "@/components/hotels/related-hotels"
import { BookingWidget } from "@/components/booking/booking-widget"
import { api } from "@/lib/app"


interface HotelPageProps {
  params: { id: string }
}

export default async function HotelPage({ params }: HotelPageProps) {
  const hotel = await api.getHotelById(params.id)

  if (!hotel) {
    notFound()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const relatedHotels = await api.getRelatedHotels(hotel.id, hotel.location as any)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Hotels", href: "/hotels" },
    { label: hotel.name, href: `/hotels/${hotel.id}` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <HotelHero hotel={hotel} />
            <HotelInfo hotel={hotel} />
            <HotelReviews hotelId={hotel.id} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingWidget item={hotel} type="hotel" basePrice={hotel.pricePerNight} currency="NGN" />
            </div>
          </div>
        </div>

        <RelatedHotels hotels={relatedHotels} />
      </div>
    </div>
  )
}
