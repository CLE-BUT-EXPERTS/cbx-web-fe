"use client"

import type React from "react"

import { useState } from "react"
import { type AboutContent, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface AboutFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function AboutForm({ onSuccess, onCancel }: AboutFormProps) {
  const { aboutContent, updateAboutContent } = useAdminStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<AboutContent>({
    mission: aboutContent.mission,
    vision: aboutContent.vision,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      updateAboutContent(formData)
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
          <Label htmlFor="mission">Mission Statement</Label>
          <Textarea
            id="mission"
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            placeholder="Our mission is to empower public and private sectors..."
            rows={6}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vision">Vision Statement</Label>
          <Textarea
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            placeholder="Our vision is to create a future where technology enhances..."
            rows={6}
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
              Updating...
            </>
          ) : (
            <>Update About Content</>
          )}
        </Button>
      </div>
    </form>
  )
}
