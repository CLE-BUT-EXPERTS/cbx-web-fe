"use client"

import type React from "react"
import axios from "axios"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TeamFormProps {
  member?: TeamMember;
  onSave: (member: TeamMember) => Promise<any> | void;
  onCancel?: () => void;
}

export default function TeamForm({ member, onSave, onCancel }: TeamFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<TeamMember>({
    firstname: member?.firstname || "",
    lastname: member?.lastname || "",
    email: member?.email || "",
    password: member?.password || "",
    phone: member?.phone || "",
    gender: member?.gender || "",
    role: member?.role || "user",
    image: member?.image || "/placeholder.svg?height=80&width=80",
    id: member?.id, // include id if editing
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle image upload using /api/upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    setError(null)
    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("folderName", "team")
      const res = await axios.post("/api/upload", uploadData)
      setFormData((prev) => ({
        ...prev,
        image: res.data.url,
      }))
    } catch {
      setError("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await onSave(formData)
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        role: "user",
        image: "/placeholder.svg?height=80&width=80",
      })
      // Show feedback
      setFeedback("User saved successfully!")
      setTimeout(() => setFeedback(null), 3000)
    } catch (err) {
      setError("An error occurred while saving the user. Please try again.")
      console.error("Error saving user:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      {feedback && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {feedback}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required={!member}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image</Label>
          <div className="flex items-center gap-4">
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/team/avatar.png"
              className="flex-1"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={imageUploading}
            >
              {imageUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
          {formData.image && (
            <img src={formData.image} alt="Profile" className="mt-2 rounded-md max-h-20" />
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit" className="bg-[#004D40] hover:bg-[#00695C] text-white" disabled={loading || imageUploading}>
          {loading || imageUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {member ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{member ? "Update" : "Create"} User</>
          )}
        </Button>
      </div>
    </form>
  )
}