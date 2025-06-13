"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import axios from "axios"

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

export default function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    goals: "",
    availability: {
      weekdays: false,
      weekends: false,
      evenings: false,
      mornings: false,
    },
    preferredLearning: {
      visual: false,
      auditory: false,
      reading: false,
      handson: false,
    },
    accessibility: "",
    agreement: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/${id}`)
        if (!res.ok) throw new Error("Course not found")
        const data = await res.json()
        setCourse(data)
      } catch {
        setCourse(null)
      }
    }
    if (id) fetchCourse()
  }, [id])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!course) return

    // Map formData to API payload
    const payload = {
      companyId: course.userId || 0,
      courseId: course.id || 0,
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      experienceLevel: formData.experience,
      learningGoals: formData.goals,
      availability: Object.entries(formData.availability)
        .filter(([_, checked]) => checked)
        .map(([key]) => key),
      learningStyle: Object.entries(formData.preferredLearning)
        .filter(([_, checked]) => checked)
        .map(([key]) => key),
      accessibilityNeeds: formData.accessibility,
      agreeToTerms: formData.agreement,
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/trainee-enrollments`,
        payload
      )
      setSubmitted(true)
      setShowForm(false)
    } catch (err) {
      setSubmitError("Failed to submit enrollment. Please try again.")
    }
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004D40]"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 lg:h-96 w-full">
          <Image
            src={course.coverImage || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container px-8 py-8">
              <div className="inline-block bg-[#004D40] text-white px-3 py-1 text-sm font-medium rounded-md mb-2">
                {course.level}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{course.title}</h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {course.location}
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {/* Static days */}
                  Monday to Friday
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {/* Static duration */}
                  12 weeks
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {course.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="container px-8 py-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "overview"
                        ? "border-[#004D40] text-[#004D40]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("curriculum")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "curriculum"
                        ? "border-[#004D40] text-[#004D40]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab("instructor")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "instructor"
                        ? "border-[#004D40] text-[#004D40]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Instructor
                  </button>
                  <button
                    onClick={() => setActiveTab("testimonials")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "testimonials"
                        ? "border-[#004D40] text-[#004D40]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Testimonials
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#004D40] mb-4">Course Overview</h2>
                  <p className="text-gray-700 mb-6">{course.description}</p>

                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-[#004D40] mb-3">Course Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Start Date:</span> {course.startDate}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Duration:</span> 12 weeks
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Location:</span> {course.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Schedule:</span> Monday to Friday
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Level:</span> {course.level}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Price:</span> {course.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#004D40] mb-3">Prerequisites</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.prequesites.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-[#004D40] mb-3">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#004D40] mb-4">Course Curriculum</h2>
                  <div className="space-y-4">
                    {course.calculmn.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-[#004D40] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <h3 className="font-medium text-gray-800">{item}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "instructor" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#004D40] mb-4">Meet Your Instructor</h2>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 p-6 rounded-lg">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=128&width=128"
                        alt="Instructor"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#004D40] mb-2">John Doe</h3>
                      <p className="text-gray-700 mb-4">
                        Senior Instructor with 10+ years of experience in the field. Passionate about teaching and helping students succeed.
                      </p>
                      <div className="flex space-x-3">
                        <a href="#" className="text-[#004D40] hover:text-[#00695C]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="text-[#004D40] hover:text-[#00695C]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                        <a href="#" className="text-[#004D40] hover:text-[#00695C]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "testimonials" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#004D40] mb-4">Student Testimonials</h2>
                  <div className="grid gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#004D40]/20 flex items-center justify-center text-[#004D40] font-bold mr-4">
                          J
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Jane Doe</h3>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">
                        This course was a game-changer for my career. The hands-on approach and expert instructors made all the difference!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold text-[#004D40] mb-4">Course Summary</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#004D40] mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium block">Start Date</span>
                        <span className="text-gray-600">{course.startDate}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#004D40] mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium block">Duration</span>
                        <span className="text-gray-600">12 weeks</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#004D40] mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium block">Location</span>
                        <span className="text-gray-600">{course.location}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#004D40] mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium block">Price</span>
                        <span className="text-gray-600">{course.price}</span>
                      </div>
                    </li>
                  </ul>
                  <button
                    className="w-full bg-[#004D40] hover:bg-[#00695C] text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-300"
                    onClick={() => setShowForm(!showForm)}
                  >
                    Enroll Now
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-[#004D40] mb-4">Need Help?</h3>
                  <p className="text-gray-700 mb-4">
                    Have questions about this course? Contact our support team for assistance.
                  </p>
                  <a href="#" className="text-[#004D40] hover:text-[#00695C] font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Form */}
          {showForm && (
            <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#004D40] mb-6">Trainee Enrollment Form</h2>
              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{submitError}</div>
              )}
              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#004D40] mb-4">Personal Information</h3>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                    rows={3}
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#004D40] mb-4">Learning Preferences</h3>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Learning Goals</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                    rows={3}
                    required
                  ></textarea>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Availability (Check all that apply)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availability.weekdays"
                        checked={formData.availability.weekdays}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <span>Weekdays</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availability.weekends"
                        checked={formData.availability.weekends}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <span>Weekends</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availability.mornings"
                        checked={formData.availability.mornings}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <span>Mornings</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="availability.evenings"
                        checked={formData.availability.evenings}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <span>Evenings</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#004D40] mb-4">Learning Style</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferredLearning.visual"
                        checked={formData.preferredLearning.visual}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <div>
                        <span className="font-medium block">Visual Learning</span>
                        <span className="text-sm text-gray-500">
                          Learn best through images, diagrams, and demonstrations
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferredLearning.auditory"
                        checked={formData.preferredLearning.auditory}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <div>
                        <span className="font-medium block">Auditory Learning</span>
                        <span className="text-sm text-gray-500">Learn best through listening and discussions</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferredLearning.reading"
                        checked={formData.preferredLearning.reading}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <div>
                        <span className="font-medium block">Reading/Writing</span>
                        <span className="text-sm text-gray-500">
                          Learn best through reading materials and taking notes
                        </span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferredLearning.handson"
                        checked={formData.preferredLearning.handson}
                        onChange={handleFormChange}
                        className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      />
                      <div>
                        <span className="font-medium block">Hands-on Learning</span>
                        <span className="text-sm text-gray-500">
                          Learn best through practical exercises and projects
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Accessibility Needs (if any)</label>
                  <textarea
                    name="accessibility"
                    value={formData.accessibility}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                    rows={3}
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleFormChange}
                      className="w-4 h-4 text-[#004D40] border-gray-300 rounded focus:ring-[#004D40]"
                      required
                    />
                    <span>I agree to the terms and conditions of enrollment.</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-[#004D40] hover:bg-[#00695C] text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}

          {submitted && (
            <div className="mt-8 p-6 bg-green-100 text-green-700 rounded-lg border border-green-200">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-lg font-semibold">Application Submitted Successfully!</h3>
              </div>
              <p>
                Thank you for enrolling in {course.title}. We will contact you via email or phone with further details
                about the course and payment options.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
