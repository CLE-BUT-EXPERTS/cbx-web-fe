"use client"

import type React from "react"
import { useState, useRef } from "react"
import { type BlogPost } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, X } from "lucide-react"
import axios from "axios"
import Cookies from "js-cookie"

interface BlogFormProps {
  blogPost?: BlogPost
  onSave: (blogPost: Omit<BlogPost, "id">) => void
  onCancel?: () => void
}

export default function BlogForm({ blogPost, onSave, onCancel }: BlogFormProps) {
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: blogPost?.title || "",
    content: blogPost?.content || "",
    type: blogPost?.type || "",
    published: blogPost?.published ?? false,
    coverImage: blogPost?.coverImage || "",
  })

  const [newTag, setNewTag] = useState("")
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    })
  }

  // Handle image upload using /api/upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("folderName", "blog")
      const res = await axios.post("/api/upload", uploadData)
      setFormData((prev) => ({
        ...prev,
        coverImage: res.data.url,
      }))
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = Cookies.get('token')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (onSave) onSave(formData)
      // Reset form fields
      setFormData({
        title: "",
        content: "",
        type: "",
        published: false,
        coverImage: "",
      })
      setFeedback("Blog post saved successfully!")
      setTimeout(() => setFeedback(null), 3000)
    } catch (err) {
      console.error("Error saving blog post:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Blog Post Details</h3>
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title of the post"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Content of the post"
              rows={10}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select type</option>
              <option value="blog">Blog</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="/images/blog/cover.jpg"
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
            {formData.coverImage && (
              <img src={formData.coverImage} alt="Cover" className="mt-2 rounded-md max-h-40" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            <Label htmlFor="published">Published</Label>
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
                {blogPost ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{blogPost ? "Update" : "Create"} Blog Post</>
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