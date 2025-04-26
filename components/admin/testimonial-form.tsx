"use client"

import type React from "react"

import { useState } from "react"
import { type Testimonial, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSuccess?: () => void
  onCancel?: () => void
}

export default function TestimonialForm({ testimonial, onSuccess, onCancel }: TestimonialFormProps) {
  const { addTestimonial, updateTestimonial } = useAdminStore()
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (testimonial) {
        updateTestimonial(testimonial.id, formData)
      } else {
        addTestimonial(formData)
      }

      setLoading(false)
      if (onSuccess) {
        onSuccess()
      }
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
  )
}
