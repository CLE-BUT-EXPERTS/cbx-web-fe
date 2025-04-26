"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function PartnersSection() {
  const partnersRef = useRef(null)
  const partnersInView = useInView(partnersRef, { once: true })

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

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={partnersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((partner) => (
              <motion.div
                key={partner}
                className="grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={`/placeholder.svg?height=80&width=160&text=Partner ${partner}`}
                  alt={`Partner ${partner}`}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials - Redesigned */}
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
            {[
              {
                quote:
                  "CLÉ-BUT EXPERTS has been an invaluable partner in our digital transformation journey. Their expertise and dedication have helped us achieve remarkable results.",
                author: "Sarah Johnson",
                position: "CTO, Global Financial Services",
              },
              {
                quote:
                  "Working with CLÉ-BUT EXPERTS has been a game-changer for our organization. Their innovative solutions and strategic guidance have significantly improved our operational efficiency.",
                author: "Michael Chen",
                position: "Director of IT, National Education Board",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative testimonial-quote"
                initial={{ opacity: 0, y: 20 }}
                animate={partnersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + 0.2 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-8 relative z-10">
                  <blockquote className="text-gray-600 italic text-lg">{testimonial.quote}</blockquote>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#004D40] to-[#D4A017] flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[#004D40] text-lg">{testimonial.author}</p>
                    <p className="text-[#D4A017]">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
