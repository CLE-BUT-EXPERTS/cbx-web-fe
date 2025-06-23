"use client"

import type React from "react"
import axios from "axios"
import { useState, useRef } from "react"
import { type Partner } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Cookies from "js-cookie"

interface PartnerFormProps {
  partner?: Partner
  onSuccess?: () => void
  onCancel?: () => void
  apiEndpoint: string
}

export default function PartnerForm({ partner, onSuccess, onCancel, apiEndpoint }: PartnerFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoUploading, setlogoUploading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<Omit<Partner, "id">>({
    name: partner?.name || "",
    logo: partner?.logo || "/placeholder.svg?height=80&width=160",
    website: partner?.website || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle logo upload using /api/upload
  const handlelogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setlogoUploading(true)
    setError(null)
    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("folderName", "partners")
      const res = await axios.post("/api/upload", uploadData)
      setFormData((prev) => ({
        ...prev,
        logo: res.data.url,
      }))
    } catch {
      setError("Failed to upload logo")
    } finally {
      setlogoUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const token = Cookies.get('token')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/partners`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (onSuccess) onSuccess()
      // Reset form fields
      setFormData({
        name: "",
        logo: "/placeholder.svg?height=80&width=160",
        website: "",
      })
      setFeedback("Partner saved successfully!")
      setTimeout(() => setFeedback(null), 3000)
    } catch (err) {
      setError("An error occurred while saving the partner. Please try again.")
      console.error("Error saving partner:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
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
            <Label htmlFor="logo">Logo logo URL</Label>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="/logos/partners/acme-logo.png"
                className="flex-1"
                required
              />
              <input
                type="file"
                accept="logo/*"
                ref={fileInputRef}
                onChange={handlelogoChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={logoUploading}
              >
                {logoUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
            {formData.logo && (
              <img src={formData.logo} alt="Partner Logo" className="mt-2 rounded-md max-h-20" />
            )}
            <p className="text-xs text-gray-500">Use a placeholder if you don't have an logo yet</p>
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

          <Button type="submit" className="bg-[#004D40] hover:bg-[#00695C] text-white" disabled={loading || logoUploading}>
            {loading || logoUploading ? (
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

      {feedback && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {feedback}
        </div>
      )}
    </>
  )
}