"use client"

import type React from "react"

import { useState } from "react"
import { type Partner, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface PartnerFormProps {
  partner?: Partner
  onSuccess?: () => void
  onCancel?: () => void
}

export default function PartnerForm({ partner, onSuccess, onCancel }: PartnerFormProps) {
  const { addPartner, updatePartner } = useAdminStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Omit<Partner, "id">>({
    name: partner?.name || "",
    image: partner?.image || "/placeholder.svg?height=80&width=160",
    website: partner?.website || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (partner) {
        updatePartner(partner.id, formData)
      } else {
        addPartner(formData)
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
          <Label htmlFor="name">Partner Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Acme Corporation"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Logo Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/partners/acme-logo.png"
            required
          />
          <p className="text-xs text-gray-500">Use a placeholder if you don't have an image yet</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website URL (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder="https://www.acme.com"
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
              {partner ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{partner ? "Update" : "Create"} Partner</>
          )}
        </Button>
      </div>
    </form>
  )
}
