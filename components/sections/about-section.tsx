"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function AboutSection() {
  const aboutRef = useRef(null)
  const aboutInView = useInView(aboutRef, { once: true })

  return (
    <section id="about" ref={aboutRef} className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="container px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-5xl font-bold text-[#004D40] mb-4 relative z-10">Discover Our Purpose</h2>
            <div className="absolute -bottom-3 left-0 right-0 h-3 bg-[#D4A017]/30 -rotate-1 z-0"></div>
          </div>
          <p className="max-w-3xl mx-auto text-gray-600 mt-6">
            At the core of CLÉ-BUT EXPERTS lies a commitment to excellence and innovation in IT solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Mission Card - Angled */}
          <motion.div
            className="relative overflow-hidden bg-[#004D40] text-white p-12 md:p-16 slant-card-left"
            initial={{ opacity: 0, x: -50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/20 rounded-bl-full z-0"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4A017]/20 rounded-tr-full z-0"></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#D4A017]"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>

              <p className="mb-6 text-white/90 flex-grow">
                Our mission is to empower public and private sectors through customized IT solutions, including software
                development, training, and consulting services. We strive to enhance efficiency and foster growth while
                bridging the digital divide by equipping organizations and future generations with essential technology
                skills. We are dedicated to implementing best practices that ensure sustainable progress through
                seamless IT integration.
              </p>

              <motion.div
                className="w-full h-1 bg-[#D4A017]/50 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={aboutInView ? { width: "100%" } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-[#D4A017]"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Vision Card - Angled */}
          <motion.div
            className="relative overflow-hidden bg-[#D4A017] text-white p-12 md:p-16 slant-card-right"
            initial={{ opacity: 0, x: 50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#004D40]/20 rounded-bl-full z-0"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#004D40]/20 rounded-tr-full z-0"></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#004D40]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>

              <p className="mb-6 text-white/90 flex-grow">
                Our vision is to create a future where technology enhances organizational performance and societal
                impact across all sectors. We aspire to be the leading catalyst for digital transformation, fostering an
                ecosystem where IT empowers both established organizations and emerging talents. We aim to build a
                digitally empowered world, ensuring that everyone is equipped to meet future challenges and seize
                opportunities.
              </p>

              <motion.div
                className="w-full h-1 bg-[#004D40]/50 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={aboutInView ? { width: "100%" } : {}}
                transition={{ duration: 1.5, delay: 0.7 }}
              >
                <motion.div
                  className="h-full bg-[#004D40]"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
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
