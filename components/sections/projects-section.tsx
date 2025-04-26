"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function ProjectsSection() {
  const projectsRef = useRef(null)
  const projectsInView = useInView(projectsRef, { once: true })

  const projects = [
    {
      id: "erp-system",
      title: "Enterprise Resource Planning System",
      client: "National Bank",
      description:
        "Developed and implemented a comprehensive ERP system to streamline operations and improve efficiency.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "digital-learning",
      title: "Digital Learning Platform",
      client: "Ministry of Education",
      description:
        "Created an interactive digital learning platform to enhance educational outcomes and accessibility.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "supply-chain",
      title: "Supply Chain Management Solution",
      client: "Global Logistics Company",
      description:
        "Designed a custom supply chain management solution to optimize logistics operations and reduce costs.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "healthcare-system",
      title: "Healthcare Information System",
      client: "Regional Hospital Network",
      description:
        "Implemented a secure healthcare information system to improve patient care and administrative efficiency.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section id="projects" ref={projectsRef} className="w-full py-20 md:py-32 bg-gray-50 relative">
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,0L80,10.7C160,21,320,43,480,42.7C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      <div className="container px-8 relative z-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block relative">
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[#D4A017]"></span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#004D40] mb-4">Success Stories</h2>
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[#D4A017]"></span>
          </div>
          <p className="max-w-3xl mx-auto text-gray-600 mt-6">
            Explore our portfolio of successful projects that have helped organizations across various sectors achieve
            their digital transformation goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="group"
              whileHover={{ y: -10 }}
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-lg h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004D40] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end">
                    <div className="p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block text-white text-sm font-medium bg-[#D4A017] px-3 py-1 rounded-full mb-2">
                        {project.client}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-white/90">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#004D40] mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center bg-[#004D40] hover:bg-[#00695C] text-white px-4 py-2 rounded-md transition-colors"
                  >
                    View Case Study
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
