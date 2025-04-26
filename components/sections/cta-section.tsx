"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function CTASection() {
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true })

  return (
    <section id="cta" ref={ctaRef} className="w-full py-20 md:py-32 relative bg-[#004D40] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A017]/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Partner with CLÉ-BUT EXPERTS to navigate your digital transformation journey and unlock your organization's
            full potential.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-[#D4A017] hover:bg-[#B8860B] text-white px-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white/10 border-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Services
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
