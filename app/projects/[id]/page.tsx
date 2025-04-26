"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

// Mock project data
const projectsData = [
  {
    id: "erp-system",
    title: "Enterprise Resource Planning System",
    client: "National Bank",
    description:
      "Developed and implemented a comprehensive ERP system to streamline operations and improve efficiency.",
    fullDescription: `
      <p>The National Bank approached us with a challenge: their legacy systems were siloed, causing inefficiencies and data inconsistencies across departments. They needed a modern, integrated ERP solution that could unify their operations while maintaining the highest security standards required in the financial sector.</p>
      
      <p>Our team conducted an extensive analysis of their existing workflows and systems, identifying key pain points and opportunities for improvement. We then designed and developed a custom ERP solution that integrated finance, human resources, procurement, and customer relationship management into a single, cohesive platform.</p>
      
      <p>The implementation was phased over 18 months, with careful data migration and comprehensive training programs to ensure a smooth transition. We worked closely with the bank's IT team to ensure the system met their stringent security requirements and regulatory compliance needs.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "January 2023",
    duration: "18 months",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "Kubernetes"],
    results: [
      "30% reduction in operational costs",
      "50% faster financial reporting",
      "99.9% system uptime",
      "Improved data accuracy and consistency",
      "Enhanced regulatory compliance",
    ],
    testimonial: {
      quote:
        "The ERP system developed by CLÉ-BUT EXPERTS has transformed our operations. We now have real-time visibility across all departments, enabling faster decision-making  We now have real-time visibility across all departments, enabling faster decision-making and improved customer service. The team at CLÉ-BUT EXPERTS was professional, responsive, and truly understood our business needs.",
      author: "Sarah Johnson",
      position: "CIO, National Bank",
    },
  },
  {
    id: "digital-learning",
    title: "Digital Learning Platform",
    client: "Ministry of Education",
    description: "Created an interactive digital learning platform to enhance educational outcomes and accessibility.",
    fullDescription: `
      <p>The Ministry of Education sought to modernize the country's educational system by implementing a digital learning platform that would be accessible to students across the nation, regardless of their location or socioeconomic status. The goal was to provide equal access to quality educational resources and improve learning outcomes nationwide.</p>
      
      <p>Our team designed and developed a comprehensive digital learning platform that works both online and offline, ensuring accessibility even in areas with limited internet connectivity. The platform includes interactive lessons, assessments, progress tracking, and collaboration tools for students and teachers.</p>
      
      <p>We implemented a user-centered design approach, conducting extensive research with students, teachers, and administrators to ensure the platform met their needs. The solution was built with scalability in mind, allowing for future expansion and integration with other educational tools and systems.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 2022",
    duration: "12 months",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Progressive Web App", "WebRTC"],
    results: [
      "Reached over 500,000 students nationwide",
      "25% improvement in standardized test scores",
      "90% teacher satisfaction rate",
      "Reduced educational inequality in rural areas",
      "Enabled continuous learning during pandemic restrictions",
    ],
    testimonial: {
      quote:
        "The digital learning platform has revolutionized education in our country. Students who previously had limited access to quality educational resources now have the world at their fingertips. The platform's intuitive design and offline capabilities have made it accessible to all, regardless of location or internet connectivity.",
      author: "Michael Nkurunziza",
      position: "Director of Digital Transformation, Ministry of Education",
    },
  },
  {
    id: "supply-chain",
    title: "Supply Chain Management Solution",
    client: "Global Logistics Company",
    description:
      "Designed a custom supply chain management solution to optimize logistics operations and reduce costs.",
    fullDescription: `
      <p>A leading global logistics company was facing challenges with their supply chain visibility, inventory management, and operational efficiency. They needed a modern solution that could provide real-time tracking, predictive analytics, and seamless integration with their existing systems and partner networks.</p>
      
      <p>Our team developed a comprehensive supply chain management solution that leverages IoT sensors, blockchain technology, and advanced analytics to provide end-to-end visibility and optimization. The system tracks shipments in real-time, predicts potential disruptions, and automatically suggests alternative routes or solutions.</p>
      
      <p>We implemented the solution in phases, starting with core functionality and gradually adding more advanced features. Throughout the process, we worked closely with the client's team to ensure smooth integration with their existing systems and to provide training for all users.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 2022",
    duration: "15 months",
    technologies: ["Python", "Django", "React", "IoT", "Blockchain", "Machine Learning", "AWS"],
    results: [
      "22% reduction in logistics costs",
      "35% decrease in delivery delays",
      "40% improvement in inventory accuracy",
      "Real-time visibility across the entire supply chain",
      "Enhanced customer satisfaction through reliable delivery estimates",
    ],
    testimonial: {
      quote:
        "The supply chain management solution developed by CLÉ-BUT EXPERTS has transformed our operations. We now have unprecedented visibility into our entire supply chain, allowing us to identify and address issues before they impact our customers. The predictive analytics capabilities have been particularly valuable in helping us navigate global supply chain disruptions.",
      author: "Robert Chen",
      position: "COO, Global Logistics Company",
    },
  },
  {
    id: "healthcare-system",
    title: "Healthcare Information System",
    client: "Regional Hospital Network",
    description:
      "Implemented a secure healthcare information system to improve patient care and administrative efficiency.",
    fullDescription: `
      <p>A regional network of hospitals was struggling with fragmented patient records, inefficient administrative processes, and challenges in coordinating care across multiple facilities. They needed an integrated healthcare information system that could unify patient data while maintaining the highest standards of security and compliance with healthcare regulations.</p>
      
      <p>Our team designed and implemented a comprehensive healthcare information system that includes electronic health records (EHR), appointment scheduling, billing, pharmacy management, and analytics. The system enables secure sharing of patient information across facilities, streamlines administrative workflows, and provides valuable insights for improving care quality and operational efficiency.</p>
      
      <p>We paid special attention to user experience, working closely with healthcare professionals to ensure the system was intuitive and efficient to use in fast-paced clinical environments. The solution was built with strict adherence to healthcare data protection regulations and includes robust security features to protect sensitive patient information.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "September 2022",
    duration: "20 months",
    technologies: ["Java", "Spring Boot", "Angular", "Oracle", "FHIR", "HL7", "Azure"],
    results: [
      "45% reduction in administrative time",
      "60% faster access to patient records",
      "28% decrease in medication errors",
      "Improved coordination of care across facilities",
      "Enhanced billing accuracy and revenue cycle management",
    ],
    testimonial: {
      quote:
        "The healthcare information system has transformed how we deliver care. Our clinicians now have immediate access to complete patient information, allowing them to make better-informed decisions. The administrative efficiencies have allowed us to focus more resources on patient care, and the analytics capabilities have helped us identify opportunities for continuous improvement.",
      author: "Dr. Emily Kagame",
      position: "Chief Medical Officer, Regional Hospital Network",
    },
  },
]

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const foundProject = projectsData.find((p) => p.id === id)
      if (foundProject) {
        setProject(foundProject)
      } else {
        router.push("/")
      }
      setLoading(false)
    }
  }, [id, router])

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
                  src={project.image || "/placeholder.svg"}
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

                <h3 className="text-xl font-bold text-[#004D40] mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {projectsData
                    .filter((p) => p.id !== project.id)
                    .slice(0, 3)
                    .map((relatedProject) => (
                      <Link
                        key={relatedProject.id}
                        href={`/projects/${relatedProject.id}`}
                        className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-[#004D40] mb-1">{relatedProject.title}</h4>
                        <p className="text-sm text-gray-600">{relatedProject.client}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
