"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mountain, Phone, Mail, User, Shield, CheckCircle, AlertCircle } from "lucide-react"

interface BookingModalProps {
  tourTitle: string
  tourPrice: number
  duration: string
  difficulty: string
  dict: any
  children: React.ReactNode
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

// Simple math captcha component
function MathCaptcha({ onValidate }: { onValidate: (isValid: boolean) => void }) {
  const [num1] = useState(Math.floor(Math.random() * 10) + 1)
  const [num2] = useState(Math.floor(Math.random() * 10) + 1)
  const [userAnswer, setUserAnswer] = useState("")
  const [isValidated, setIsValidated] = useState(false)
  const correctAnswer = num1 + num2

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value)
    const isCorrect = Number.parseInt(value) === correctAnswer
    setIsValidated(isCorrect)
    onValidate(isCorrect)
  }

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        Security Check
      </Label>
      <div className="flex items-center gap-3 p-3 bg-linear-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
        <span className="text-lg font-mono">
          {num1} + {num2} = ?
        </span>
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-20"
          placeholder="?"
        />
        {isValidated && <CheckCircle className="h-5 w-5 text-green-500" />}
        {userAnswer && !isValidated && <AlertCircle className="h-5 w-5 text-red-500" />}
      </div>
    </div>
  )
}

export function BookingModal({ tourTitle, tourPrice, duration, difficulty, dict, children }: BookingModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = dict.contact?.form?.name || "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = dict.contact?.form?.email || "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!isCaptchaValid) {
      alert("Please complete the security check")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate booking submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ firstName: "", lastName: "", email: "", phone: "" })
        setOpen(false)
        setSubmitStatus("idle")
        setIsCaptchaValid(false)
      }, 2000)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetModal = () => {
    setFormData({ firstName: "", lastName: "", email: "", phone: "" })
    setErrors({})
    setSubmitStatus("idle")
    setIsCaptchaValid(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) resetModal()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-800">
            <Mountain className="h-5 w-5 text-orange-500" />
            {dict.tours?.bookNow || "Book Adventure"}
          </DialogTitle>
          <DialogDescription className="text-orange-600">
            {dict.contact?.info?.description || "Fill out the form to book your extreme adventure"}
          </DialogDescription>
        </DialogHeader>

        {/* Tour Summary */}
        <Card className="bg-linear-to-r from-orange-500/10 to-red-500/10 border-orange-300">
          <CardContent className="p-4">
            <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <Mountain className="h-4 w-4" />
              {tourTitle}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-orange-800">
              <div>Duration: {duration}</div>
              <div>Price: ${tourPrice}</div>
              <div>Difficulty: {difficulty}</div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {submitStatus === "success" ? (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-orange-700 mb-2">Adventure Booked!</h3>
            <p className="text-sm text-muted-foreground">
              We'll contact you within 24 hours to confirm your extreme adventure.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={isSubmitting}
                  className={`${errors.firstName ? "border-red-500 focus:border-red-500" : "focus:border-orange-500"}`}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={isSubmitting}
                  className={`${errors.lastName ? "border-red-500 focus:border-red-500" : "focus:border-orange-500"}`}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isSubmitting}
                className={`${errors.email ? "border-red-500 focus:border-red-500" : "focus:border-orange-500"}`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={isSubmitting}
                className={`${errors.phone ? "border-red-500 focus:border-red-500" : "focus:border-orange-500"}`}
                placeholder="+995 XXX XXX XXX"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Captcha */}
            <MathCaptcha onValidate={setIsCaptchaValid} />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              disabled={isSubmitting || !isCaptchaValid}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {dict.contact?.form?.sending || "Booking..."}
                </>
              ) : (
                <>
                  <Mountain className="h-4 w-4 mr-2" />
                  {dict.tours?.bookNow || "Book Adventure"}
                </>
              )}
            </Button>

            {submitStatus === "error" && (
              <p className="text-red-600 text-center text-sm">
                {dict.contact?.form?.error || "An error occurred. Please try again."}
              </p>
            )}

            <p className="text-xs text-muted-foreground text-center">
              * Required fields. We'll contact you within 24 hours to confirm your booking.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
