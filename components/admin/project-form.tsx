"use client"

import type React from "react"

import { useState } from "react"
import { type Project, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, X } from "lucide-react"

interface ProjectFormProps {
  project?: Project
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const { addProject, updateProject } = useAdminStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: project?.title || "",
    client: project?.client || "",
    description: project?.description || "",
    fullDescription: project?.fullDescription || "",
    image: project?.image || "/placeholder.svg?height=600&width=1200",
    date: project?.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    duration: project?.duration || "",
    technologies: project?.technologies || [],
    results: project?.results || [],
    testimonial: {
      quote: project?.testimonial?.quote || "",
      author: project?.testimonial?.author || "",
      position: project?.testimonial?.position || "",
    },
  })

  const [newTechnology, setNewTechnology] = useState("")
  const [newResult, setNewResult] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith("testimonial.")) {
      const field = name.split(".")[1]
      setFormData({
        ...formData,
        testimonial: {
          ...formData.testimonial,
          [field]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      })
      setNewTechnology("")
    }
  }

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    })
  }

  const addResult = () => {
    if (newResult.trim()) {
      setFormData({
        ...formData,
        results: [...formData.results, newResult.trim()],
      })
      setNewResult("")
    }
  }

  const removeResult = (index: number) => {
    setFormData({
      ...formData,
      results: formData.results.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (project) {
        updateProject(project.id, formData)
      } else {
        addProject(formData)
      }

      setLoading(false)
      if (onSuccess) {
        onSuccess()
      }
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enterprise Resource Planning System"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              name="client"
              value={formData.client}
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
          <Label htmlFor="fullDescription">Full Description (HTML supported)</Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="<p>Detailed description of the project...</p>"
            rows={8}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image">Featured Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/projects/erp-system.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Project Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="18 months"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Completion Date</Label>
          <Input
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="January 2023"
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Technologies Used</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.technologies.map((tech, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-sm">{tech}</span>
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={() => removeTechnology(index)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
            placeholder="Add a technology (e.g., React)"
          />
          <Button type="button" onClick={addTechnology} className="bg-[#004D40] hover:bg-[#00695C] text-white">
            <Plus size={16} className="mr-1" /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Results & Impact</h3>
        <div className="space-y-2">
          {formData.results.map((result, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-1 bg-gray-50 p-2 rounded-md">{result}</div>
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={() => removeResult(index)}
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            value={newResult}
            onChange={(e) => setNewResult(e.target.value)}
            placeholder="Add a result (e.g., 30% reduction in costs)"
          />
          <Button type="button" onClick={addResult} className="bg-[#004D40] hover:bg-[#00695C] text-white">
            <Plus size={16} className="mr-1" /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Testimonial</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial.quote">Client Quote</Label>
            <Textarea
              id="testimonial.quote"
              name="testimonial.quote"
              value={formData.testimonial.quote}
              onChange={handleChange}
              placeholder="The project has transformed our operations..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testimonial.author">Author Name</Label>
              <Input
                id="testimonial.author"
                name="testimonial.author"
                value={formData.testimonial.author}
                onChange={handleChange}
                placeholder="Sarah Johnson"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial.position">Position/Company</Label>
              <Input
                id="testimonial.position"
                name="testimonial.position"
                value={formData.testimonial.position}
                onChange={handleChange}
                placeholder="CIO, National Bank"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit" className="bg-[#004D40] hover:bg-[#00695C] text-white" disabled={loading}>
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
