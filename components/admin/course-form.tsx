"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Cookies from "js-cookie"

// Helper to decode JWT and get userId
function getUserIdFromToken(token: string | undefined): number {
  if (!token) return 0
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id || payload.userId || 0
  } catch {
    return 0
  }
}

type Course = {
  id?: string | number
  title: string
  description: string
  startDate: string
  location: string
  level: string
  price: number
  calculmn: string[]
  prequesites: string[]
  benefits: string[]
  userId: number
  coverImage: string
}

export default function CourseForm({
  course,
  onSave,
  onCancel
}: {
  course?: Course
  onSave: (data: Course) => void
  onCancel: () => void
}) {
  const token = Cookies.get('token')
  const userId = getUserIdFromToken(token)
  const [form, setForm] = useState<Course>(
    course || {
      title: "",
      description: "",
      startDate: "",
      location: "",
      level: "",
      price: 0,
      calculmn: [],
      prequesites: [],
      benefits: [],
      userId: userId,
      coverImage: ""
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // For array fields
  const [calcInput, setCalcInput] = useState("")
  const [preqInput, setPreqInput] = useState("")
  const [benefitInput, setBenefitInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Array field handlers
  const handleAddToArray = (field: keyof Course, value: string, setValue: (v: string) => void) => {
    if (!value.trim()) return
    setForm({ ...form, [field]: [...(form[field] as string[]), value.trim()] })
    setValue("")
  }
  const handleRemoveFromArray = (field: keyof Course, idx: number) => {
    setForm({
      ...form,
      [field]: (form[field] as string[]).filter((_, i) => i !== idx)
    })
  }

  // Cover image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("folderName", "courses")
      const res = await axios.post("/api/upload", uploadData)
      setForm((prev) => ({
        ...prev,
        coverImage: res.data.url,
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
      const token = Cookies.get('token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      // POST or PUT depending on edit/create
      if (course && course.id) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/${course.id}`, { ...form, userId }, { headers })
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course`, { ...form, userId }, { headers })
      }
      onSave({ ...form, userId })
      // Reset form fields
      setForm({
        title: "",
        description: "",
        startDate: "",
        location: "",
        level: "",
        price: 0,
        calculmn: [],
        prequesites: [],
        benefits: [],
        userId: userId,
        coverImage: ""
      })
      setCalcInput("")
      setPreqInput("")
      setBenefitInput("")
      setFeedback("Course saved successfully!")
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      {feedback && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {feedback}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

<div>
  <label className="block text-sm font-medium mb-1">Level</label>
  <select
    name="level"
    value={form.level}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
    required
  >
    <option value="">Select level</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>
</div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {/* Calculmn */}
      <div>
        <label className="block text-sm font-medium mb-1">Calculmn</label>
        <div className="flex gap-2">
          <input
            value={calcInput}
            onChange={e => setCalcInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Add item"
          />
          <Button type="button" onClick={() => handleAddToArray("calculmn", calcInput, setCalcInput)}>Add</Button>
        </div>
        <ul className="flex flex-wrap gap-2 mt-2">
          {form.calculmn.map((item, idx) => (
            <li key={idx} className="bg-gray-100 px-2 py-1 rounded flex items-center">
              {item}
              <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveFromArray("calculmn", idx)}>×</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Prequesites */}
      <div>
        <label className="block text-sm font-medium mb-1">Prequesites</label>
        <div className="flex gap-2">
          <input
            value={preqInput}
            onChange={e => setPreqInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Add item"
          />
          <Button type="button" onClick={() => handleAddToArray("prequesites", preqInput, setPreqInput)}>Add</Button>
        </div>
        <ul className="flex flex-wrap gap-2 mt-2">
          {form.prequesites.map((item, idx) => (
            <li key={idx} className="bg-gray-100 px-2 py-1 rounded flex items-center">
              {item}
              <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveFromArray("prequesites", idx)}>×</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Benefits */}
      <div>
        <label className="block text-sm font-medium mb-1">Benefits</label>
        <div className="flex gap-2">
          <input
            value={benefitInput}
            onChange={e => setBenefitInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Add item"
          />
          <Button type="button" onClick={() => handleAddToArray("benefits", benefitInput, setBenefitInput)}>Add</Button>
        </div>
        <ul className="flex flex-wrap gap-2 mt-2">
          {form.benefits.map((item, idx) => (
            <li key={idx} className="bg-gray-100 px-2 py-1 rounded flex items-center">
              {item}
              <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveFromArray("benefits", idx)}>×</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Cover Image</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Image URL"
            readOnly
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={imageUploading}>
            {imageUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {form.coverImage && (
          <img src={form.coverImage} alt="Cover" className="mt-2 rounded-md max-h-40" />
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" className="bg-[#004D40] text-white" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}