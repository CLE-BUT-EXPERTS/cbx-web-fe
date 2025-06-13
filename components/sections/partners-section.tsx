"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import axios from "axios"

type Partner = {
  id: string | number
  name?: string
  logo: string
  website?: string
}

type Testimonial = {
  id: string | number
  name: string
  feedback: string
  image?: string
  role?: string
}

export default function PartnersSection() {
  const partnersRef = useRef(null)
  const partnersInView = useInView(partnersRef, { once: true })
  const [partners, setPartners] = useState<Partner[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/1`)
        const data = res.data.data.partners
        let partnersArr: Partner[] = []
        if (Array.isArray(data)) {
          partnersArr = data
        } else if (typeof data === "object" && data !== null) {
          partnersArr = Object.values(data)
        }
        setPartners(partnersArr)
      } catch (e) {
        setPartners([])
        console.error("Failed to fetch partners:", e)
      }
    }
    fetchPartners()
  }, [])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/1`)
        const data = res.data.data.testimonials
        let testimonialsArr: Testimonial[] = []
        if (Array.isArray(data)) {
          testimonialsArr = data
        } else if (typeof data === "object" && data !== null) {
          testimonialsArr = Object.values(data)
        }
        setTestimonials(testimonialsArr)
      } catch (e) {
        setTestimonials([])
        console.error("Failed to fetch testimonials:", e)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section id="partners" ref={partnersRef} className="w-full py-20 md:py-32 relative">
      <div className="container px-8 relative z-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={partnersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#004D40] mb-4 relative inline-block">
            Strategic Alliances
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#D4A017] transform -rotate-1"></div>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mt-6">
            We collaborate with leading organizations to deliver exceptional solutions and services that drive
            innovation and growth.
          </p>
        </motion.div>

        {/* Horizontal scrolling partner logos */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8 items-center animate-scroll"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {partners.map((partner, index) => (
              <a
                key={partner.id || index}
                href={partner.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={partner.logo ? `/${partner.logo}` : "/placeholder.svg"}
                  alt={partner.name ? partner.name : `Partner ${index + 1}`}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials - Now fetched from API */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={partnersInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-[#004D40] mb-4">Client Testimonials</h3>
          <p className="text-gray-600">Hear what our clients have to say about working with CLÉ-BUT EXPERTS.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index}
              className="relative testimonial-quote"
              initial={{ opacity: 0, y: 20 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + 0.2 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-8 relative z-10">
                <blockquote className="text-gray-600 italic text-lg">{testimonial.feedback}</blockquote>
              </div>
              <div className="flex items-center">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#004D40] to-[#D4A017] flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {testimonial.name ? testimonial.name.charAt(0) : "?"}
                  </div>
                )}
                <div>
                  <p className="font-medium text-[#004D40] text-lg">{testimonial.name}</p>
                  <p className="text-[#D4A017]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
