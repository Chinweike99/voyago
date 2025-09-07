import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { TourHero } from "@/components/tours/tour-hero"
import { TourInfo } from "@/components/tours/tour-info"
import { RelatedTours } from "@/components/tours/related-tours"
import { BookingWidget } from "@/components/booking/booking-widget"
import { TourReviews } from "@/components/tours/tour-review"
import { api } from "@/lib/app"

interface TourPageProps {
  params: { id: string }
}

export default async function TourPage({ params }: TourPageProps) {
  const tour = await api.getTourById(params.id)

  if (!tour) {
    notFound()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const relatedTours = await api.getRelatedTours(tour.id, tour.location as any)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: tour.title, href: `/tours/${tour.id}` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <TourHero tour={tour} />
            <TourInfo tour={tour} />
            <TourReviews tourId={tour.id} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingWidget item={tour} type="tour" basePrice={tour.price} currency="$"/>
            </div>
          </div>
        </div>

        <RelatedTours tours={relatedTours} />
      </div>
    </div>
  )
}
