"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { User, CreditCard, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  cardNumber: z.string().min(16, "Please enter a valid card number"),
  expiryDate: z.string().min(5, "Please enter expiry date (MM/YY)"),
  cvv: z.string().min(3, "Please enter CVV"),
  cardName: z.string().min(2, "Please enter cardholder name"),
  agreeTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
  agreeMarketing: z.boolean().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>
interface BookingFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookingData: any
}

export function BookingForm({ bookingData }: BookingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    const confirmationData = {
      ...bookingData,
      ...data,
      confirmationNumber: `WL${Date.now()}`,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    }

    localStorage.setItem("bookingConfirmation", JSON.stringify(confirmationData))
    router.push("/booking/confirmation")
  }

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Confirmation", icon: CheckCircle },
  ]

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.number
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 transition-colors ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" {...register("cardName")} className={errors.cardName ? "border-red-500" : ""} />
                  {errors.cardName && <p className="text-sm text-red-500 mt-1">{errors.cardName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    {...register("cardNumber")}
                    className={errors.cardNumber ? "border-red-500" : ""}
                  />
                  {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      {...register("expiryDate")}
                      className={errors.expiryDate ? "border-red-500" : ""}
                    />
                    {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      {...register("cvv")}
                      className={errors.cvv ? "border-red-500" : ""}
                    />
                    {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    {...register("agreeTerms")}
                    onCheckedChange={(checked: boolean) => setValue("agreeTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeMarketing"
                    {...register("agreeMarketing")}
                    onCheckedChange={(checked: boolean) => setValue("agreeMarketing", checked as boolean)}
                  />
                  <Label htmlFor="agreeMarketing" className="text-sm">
                    I would like to receive marketing emails about special offers and updates
                  </Label>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2 min-w-[120px]">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Booking
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
