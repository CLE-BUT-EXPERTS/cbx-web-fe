"use client"

import type React from "react"

import { useState } from "react"
import { type Service, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface ServiceFormProps {
  service?: Service
  onSuccess?: () => void
  onCancel?: () => void
}

const iconOptions = [
  { value: "code", label: "Code" },
  { value: "book-open", label: "Book Open" },
  { value: "users", label: "Users" },
  { value: "box", label: "Box" },
  { value: "layout", label: "Layout" },
  { value: "server", label: "Server" },
  { value: "database", label: "Database" },
  { value: "globe", label: "Globe" },
  { value: "shield", label: "Shield" },
  { value: "cpu", label: "CPU" },
  { value: "smartphone", label: "Smartphone" },
  { value: "cloud", label: "Cloud" },
]

export default function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
  const { addService, updateService } = useAdminStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Omit<Service, "id">>({
    title: service?.title || "",
    description: service?.description || "",
    icon: service?.icon || "code",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleIconChange = (value: string) => {
    setFormData({
      ...formData,
      icon: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (service) {
        updateService(service.id, formData)
      } else {
        addService(formData)
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
          <Label htmlFor="title">Service Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Software Development"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Custom software solutions designed to address your specific business challenges..."
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Select value={formData.icon} onValueChange={handleIconChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.value} value={icon.value}>
                  {icon.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              {service ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{service ? "Update" : "Create"} Service</>
          )}
        </Button>
      </div>
    </form>
  )
}
