"use client"

import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, X } from "lucide-react"

interface EnrollmentFormProps {
  enrollmentId?: string
  onCancel?: () => void
}

export default function EnrollmentForm({ enrollmentId, onCancel }: EnrollmentFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    traineeName: "",
    email: "",
    phone: "",
    course: "",
    status: "pending",
    date: new Date().toISOString(),
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleStatusChange = (value: string) => {
    setFormData({
      ...formData,
      status: value as "pending" | "approved" | "rejected",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const url = enrollmentId ? `${process.env.BASE_URL}/training/${enrollmentId}` : `${process.env.BASE_URL}/training`
    const method = enrollmentId ? "PUT" : "POST"
    
    try {
      axios({ method, url, data: formData })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (enrollmentId) {
      axios.get(`${process.env.BASE_URL}/training/${enrollmentId}`)
        .then(response => {
          setFormData(response.data)
        })
    }
  }, [enrollmentId])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Trainee Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="traineeName">Full Name</Label>
            <Input
              id="traineeName"
              name="traineeName"
              value={formData.traineeName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Advanced Web Development"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional information about the enrollment..."
            rows={3}
          />
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
              {enrollmentId ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{enrollmentId ? "Update" : "Create"} Enrollment</>
          )}
        </Button>
      </div>
    </form>
  )
}
