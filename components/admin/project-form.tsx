"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface ProjectFormProps {
  project?: any
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [techInput, setTechInput] = useState("")
  const [formData, setFormData] = useState({
    title: project?.title || "",
    client_name: project?.client_name || "",
    description: project?.description || "",
    category: project?.category || "",
    image: project?.image || "",
    outcome: project?.outcome || "",
    slug: project?.slug || "",
    technologies: project?.technologies || [],
    status: project?.status || "published",
  })

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add technology
  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput("")
    }
  }

  // Remove technology
  const handleRemoveTech = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== idx)
    }))
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
      uploadData.append("folderName", "projects")
      const res = await axios.post("/api/upload", uploadData)
      setFormData((prev) => ({
        ...prev,
        image: res.data.url,
      }))
    } catch (err) {
      setError("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const token = Cookies.get('token')
      if (!token) throw new Error('Authentication token not found')

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      // Only send the required fields
      const payload = {
        title: formData.title,
        client_name: formData.client_name,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        outcome: formData.outcome,
        slug: formData.slug,
        technologies: formData.technologies,
        status: formData.status || "published",
      }

      if (project) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project.id}`,
          payload,
          { headers }
        )
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
          payload,
          { headers }
        )
      }

      if (onSuccess) onSuccess()
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to save project'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Project Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ERP System"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client_name">Client Name</Label>
            <Input
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              placeholder="National Bank"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A brief description of the project..."
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Banking, Healthcare"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outcome">Outcome</Label>
          <Textarea
            id="outcome"
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
            placeholder="Project outcome or impact"
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="erp-system"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="published"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Featured Image</Label>
          <div className="flex items-center gap-4">
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="flex-1"
              required
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
            <img src={formData.image} alt="Project" className="mt-2 rounded-md max-h-40" />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies</Label>
          <div className="flex gap-2">
            <Input
              id="technologies"
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              placeholder="Add technology"
            />
            <Button type="button" onClick={handleAddTech}>Add</Button>
          </div>
          <ul className="flex flex-wrap gap-2 mt-2">
            {formData.technologies.map((tech, idx) => (
              <li key={idx} className="bg-gray-100 px-2 py-1 rounded flex items-center">
                {tech}
                <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveTech(idx)}>×</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit" className="bg-[#004D40] hover:bg-[#00695C] text-white" disabled={loading || imageUploading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {project ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{project ? "Update" : "Create"} Project</>
          )}
        </Button>
      </div>
    </form>
  )
}