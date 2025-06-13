"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Cookies from 'js-cookie'

const staticFields = {
  technologies: [
    "React", "Node.js", "PostgreSQL", "AWS", "Docker"
  ],
  duration: "12 months",
  results: [
    "Increased customer engagement by 45% within six months.",
    "Reduced operational costs by 20%.",
    "Improved platform security and compliance.",
    "Enabled 24/7 digital banking services."
  ],
  testimonial: {
    quote:
      "The digital banking platform exceeded our expectations in both security and user experience. Our customers love the new features and we have seen a significant increase in engagement.",
    author: "Jane Doe",
    position: "Head of Digital Transformation, Global Financial Services"
  }
}

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = Cookies.get('token')
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${id}`,
          token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : undefined
        )
        const data = res.data

        // Compose the project object using API data and static fields
        setProject({
          id: data.id,
          title: data.title,
          client: data.client_name,
          description: data.description,
          fullDescription: `<p>${data.description}</p>`,
          image: data.image ? `/${data.image}` : "/placeholder.svg",
          date: new Date(data.createdAt).toLocaleString("default", { month: "long", year: "numeric" }),
          duration: staticFields.duration,
          technologies: staticFields.technologies,
          results: staticFields.results,
          testimonial: staticFields.testimonial,
        })
      } catch (error) {
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004D40]"></div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="case-study-header">
          <div className="container px-8 relative z-10">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-white/80 max-w-3xl">{project.description}</p>

            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center text-white/80">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center text-white/80">
                <Clock className="mr-2 h-5 w-5" />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center text-white/80">
                <User className="mr-2 h-5 w-5" />
                <span>{project.client}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="mb-12 rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold text-[#004D40] mb-6">Project Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />

                <h2 className="text-2xl md:text-3xl font-bold text-[#004D40] mt-12 mb-6">Results & Impact</h2>
                <ul>
                  {project.results.map((result: string, index: number) => (
                    <li key={index} className="mb-2">
                      {result}
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 p-8 rounded-xl mt-12 relative">
                  <div className="absolute top-4 left-4 text-8xl text-[#D4A017]/20 font-serif">"</div>
                  <blockquote className="relative z-10 italic text-gray-700 mb-6">
                    {project.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004D40] to-[#D4A017] flex items-center justify-center text-white text-xl font-bold mr-4">
                      {project.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#004D40]">{project.testimonial.author}</p>
                      <p className="text-sm text-gray-600">{project.testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Button
                  className="bg-[#004D40] hover:bg-[#00695C] text-white"
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: "smooth",
                      })
                    } else {
                      router.push("/#contact")
                    }
                  }}
                >
                  Discuss Your Project
                </Button>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold text-[#004D40] mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Related Projects section can be omitted or replaced as needed */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
