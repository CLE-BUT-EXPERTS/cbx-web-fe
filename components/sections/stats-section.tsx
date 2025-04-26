"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function StatsSection() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <section id="stats" ref={statsRef} className="w-full py-16 md:py-24 impact-section relative text-white">
      <div className="container px-4 sm:px-8 relative z-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            We have digitized many <span className="text-[#D4A017]">services</span>,
          </h2>
          <p className="text-xl md:text-2xl">Making Rwanda a Tech leader in Africa.</p>
        </motion.div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 center-mobile">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h3 className="text-5xl md:text-6xl font-bold mb-4 text-[#D4A017]">40000+</h3>
              <p className="text-white/90">
                Working hours saved for Rwandan citizens traveling to and waiting for services in  offices across the
                country.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h3 className="text-5xl md:text-6xl font-bold mb-4 text-[#D4A017]">80%</h3>
              <p className="text-white/90">
                Reduction in service access time. Services used to take 5 days, but now
                they only take 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h3 className="text-5xl md:text-6xl font-bold mb-4 text-[#D4A017]">45%</h3>
              <p className="text-white/90">
                Of users pay for our services online. Leading the path to a cashless society and economy for Rwanda.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left"
            >
              <h3 className="text-5xl md:text-6xl font-bold mb-4 text-[#D4A017]">4000+</h3>
              <p className="text-white/90">
                Agent strong network that helps users access our online services. Hey, that is 4000 new jobs!
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave bottom - Updated to match the reference image */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="150"
          viewBox="0 0 1440 150"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,128L80,117.3C160,107,320,85,480,85.3C640,85,800,107,960,112C1120,117,1280,107,1360,101.3L1440,96L1440,150L1360,150C1280,150,1120,150,960,150C800,150,640,150,480,150C320,150,160,150,80,150L0,150Z"></path>
        </svg>
      </div>
    </section>
  )
}
