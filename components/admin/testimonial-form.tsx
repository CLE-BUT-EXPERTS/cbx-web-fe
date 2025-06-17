"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"
import { type Testimonial } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import Cookies from "js-cookie"

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSuccess?: () => void
  onCancel?: () => void
}

export default function TestimonialForm({ testimonial, onSuccess, onCancel }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const [formData, setFormData] = useState<Omit<Testimonial, "id">>({
    quote: testimonial?.quote || "",
    author: testimonial?.author || "",
    position: testimonial?.position || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const token = Cookies.get('token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      if (testimonial) {
        // Update existing testimonial
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/${testimonial.id}`,
          formData,
          { headers }
        )
      } else {
        // Create new testimonial
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`,
          formData,
          { headers }
        )
      }

      setFormData({
        quote: "",
        author: "",
        position: "",
      })
      setFeedback("Saved successfully!")
      setTimeout(() => setFeedback(null), 3000)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError("Failed to save testimonial. Please try again.")
      console.error("Error saving testimonial:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {feedback && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {feedback}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quote">Testimonial Quote</Label>
            <Textarea
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="CLÉ-BUT EXPERTS has been an invaluable partner in our digital transformation journey..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position/Company</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="CTO, Global Financial Services"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button type="submit" className="bg-[#004D40] hover:bg-[#00695C] text-white" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {testimonial ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{testimonial ? "Update" : "Create"} Testimonial</>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}