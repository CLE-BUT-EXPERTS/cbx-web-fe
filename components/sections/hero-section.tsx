"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroInView = useInView(heroRef, { once: true })
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    const typingTexts = ["Empower", "Connect", "Transform"]
    let currentTextIndex = 0
    let currentText = typingTexts[currentTextIndex]
    let currentCharIndex = 0
    let isDeleting = false
    let typingSpeed = 200 // Faster typing speed

    const typingInterval = setInterval(() => {
      const typingElement = document.getElementById("typing-text")
      if (!typingElement) return

      if (!isDeleting && currentCharIndex <= currentText.length) {
        // Typing forward
        const displayText = currentText.substring(0, currentCharIndex)
        typingElement.innerHTML = ""

        // Create spans for each character with fade-in effect
        for (let i = 0; i < displayText.length; i++) {
          const charSpan = document.createElement("span")
          charSpan.textContent = displayText[i]
          charSpan.className = "visible"
          typingElement.appendChild(charSpan)
        }

        currentCharIndex++
        if (currentCharIndex > currentText.length) {
          isDeleting = true
          typingSpeed = 80 // Slightly faster when deleting
          setTimeout(() => {}, 1000) // Pause at the end of the word
        }
      } else if (isDeleting && currentCharIndex >= 0) {
        // Deleting
        const displayText = currentText.substring(0, currentCharIndex)
        typingElement.innerHTML = ""

        // Create spans for each character with fade-out effect
        for (let i = 0; i < displayText.length; i++) {
          const charSpan = document.createElement("span")
          charSpan.textContent = displayText[i]
          charSpan.className = "visible"
          typingElement.appendChild(charSpan)
        }

        currentCharIndex--
        if (currentCharIndex === 0) {
          isDeleting = false
          currentTextIndex = (currentTextIndex + 1) % typingTexts.length
          currentText = typingTexts[currentTextIndex]
          typingSpeed = 100
        }
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-[#004D40] text-white"
    >
      {/* Enhanced animated background */}
      <div className="hero-animated-bg">
        {/* Animated particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, Math.random() * 1.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Animated gradient overlays */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(0, 100, 80, 0.5) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 60%, rgba(0, 100, 80, 0.5) 0%, transparent 70%)",
              "radial-gradient(circle at 40% 80%, rgba(0, 100, 80, 0.5) 0%, transparent 70%)",
              "radial-gradient(circle at 60% 20%, rgba(0, 100, 80, 0.5) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 30%, rgba(0, 100, 80, 0.5) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      <motion.div
        className="container relative z-10 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ y: heroY }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            CLÉ-BUT EXPERTS
          </motion.h1>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mb-6 text-xl md:text-2xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="h-10 flex items-center justify-center">
              <div id="typing-text" className="typing-text text-[#D4A017]"></div>
            </div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering organizations through customized IT solutions, software development, training, and consulting
            services to enhance efficiency and foster growth.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button size="lg" className="bg-[#D4A017] hover:bg-[#B8860B] text-white px-8">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10 border-2">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
