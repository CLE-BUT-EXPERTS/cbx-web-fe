"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type TeamMember, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface TeamFormProps {
  member?: TeamMember
  onSuccess?: () => void
  onCancel?: () => void
}

export default function TeamForm({ member, onSuccess, onCancel }: TeamFormProps) {
  const router = useRouter()
  const { addTeamMember, updateTeamMember } = useAdminStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: member?.name || "",
    position: member?.position || "",
    image: member?.image || "/placeholder.svg?height=400&width=300",
    email: member?.email || "",
    social: {
      linkedin: member?.social.linkedin || "",
      twitter: member?.social.twitter || "",
      email: member?.social.email || "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.startsWith("social.")) {
      const socialField = name.split(".")[1]
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [socialField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (member) {
        updateTeamMember(member.id, formData)
      } else {
        addTeamMember(formData)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Software Engineer"
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
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/team/john-doe.jpg"
          />
          <p className="text-xs text-gray-500">Leave empty to use a placeholder image</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="social.linkedin">LinkedIn URL</Label>
          <Input
            id="social.linkedin"
            name="social.linkedin"
            value={formData.social.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social.twitter">Twitter URL</Label>
          <Input
            id="social.twitter"
            name="social.twitter"
            value={formData.social.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/johndoe"
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
              {member ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{member ? "Update" : "Create"} Team Member</>
          )}
        </Button>
      </div>
    </form>
  )
}
