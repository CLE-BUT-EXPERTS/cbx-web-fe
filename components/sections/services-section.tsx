"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function ServicesSection() {
  const servicesRef = useRef(null)
  const servicesInView = useInView(servicesRef, { once: true })

  return (
    <section id="services" ref={servicesRef} className="w-full py-20 md:py-32 bg-gray-50 relative">
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,0L80,10.7C160,21,320,43,480,42.7C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      <div className="container px-4 sm:px-8 relative z-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase tracking-wider text-[#D4A017] font-semibold mb-2">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#004D40] mb-4 relative">
              Innovative Solutions
              <div className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-[#D4A017]"></div>
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 mt-4">
              We provide comprehensive IT solutions tailored to meet the unique needs of your organization, helping you
              navigate the complexities of digital transformation.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Software Development",
              description:
                "Custom software solutions designed to address your specific business challenges and streamline operations.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              ),
            },
            {
              title: "IT Consulting",
              description:
                "Strategic guidance to help you leverage technology effectively and make informed decisions for your business.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              ),
            },
            {
              title: "Training & Development",
              description:
                "Comprehensive training programs to equip your team with the skills needed to thrive in today's digital landscape.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 14c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" />
                  <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              ),
            },
            {
              title: "Digital Transformation",
              description:
                "End-to-end solutions to help your organization embrace digital technologies and stay competitive.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" y1="22" x2="12" y2="12" />
                </svg>
              ),
            },
            {
              title: "Project Management",
              description:
                "Expert project management services to ensure your IT initiatives are delivered on time and within budget.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              ),
            },
            {
              title: "IT Infrastructure",
              description:
                "Robust infrastructure solutions to provide a solid foundation for your business operations and growth.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              ),
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-xl h-full">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 z-0"></div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#004D40]/5 rounded-bl-full z-0 transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4A017]/5 rounded-tr-full z-0 transform -translate-x-16 translate-y-16 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full items-center text-center">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#004D40] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
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
