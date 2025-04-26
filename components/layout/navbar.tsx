"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="CLÉ-BUT EXPERTS" width={120} height={50} priority className="h-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            href="#home"
            className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
          >
            About Us
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("services")
            }}
          >
            Services
          </Link>
          <Link
            href="#projects"
            className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("projects")
            }}
          >
            Projects
          </Link>
          <Link
            href="#partners"
            className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("partners")
            }}
          >
            Partners
          </Link>
          <Link
            href="#team"
            className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("team")
            }}
          >
            Team
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            className="bg-[#004D40] hover:bg-[#00695C] text-white hidden md:flex"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </Button>
          <button className="md:hidden text-[#004D40]" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-b"
        >
          <div className="container px-4 py-4">
            <div className="flex justify-end mb-4">
              <button onClick={toggleMobileMenu} className="text-[#004D40]">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link
                href="#home"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("home")
                }}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
              >
                About Us
              </Link>
              <Link
                href="#services"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("services")
                }}
              >
                Services
              </Link>
              <Link
                href="#projects"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("projects")
                }}
              >
                Projects
              </Link>
              <Link
                href="#partners"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("partners")
                }}
              >
                Partners
              </Link>
              <Link
                href="#team"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("team")
                }}
              >
                Team
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-[#004D40] hover:text-[#D4A017] transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contact")
                }}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
