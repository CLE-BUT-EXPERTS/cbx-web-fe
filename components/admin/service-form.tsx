"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Service } from "@/lib/data"

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      if (service) {
        // Update existing service
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${service.id}`,
          formData,
          { headers }
        )
      } else {
        // Create new service
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/services`,
          formData,
          { headers }
        )
      }

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error saving service:", error)
      setError(
        axios.isAxiosError(error) 
          ? error.response?.data?.message || error.message 
          : 'Failed to save service'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

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