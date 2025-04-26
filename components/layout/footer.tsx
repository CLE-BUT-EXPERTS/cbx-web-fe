"use client"

import Link from "next/link"
import Image from "next/image"
import { Briefcase, Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 bg-[#004D40] text-white relative">
      <div className="container px-4 sm:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src="/images/logo.png"
                alt="CLÉ-BUT EXPERTS"
                width={150}
                height={60}
                className="h-auto bg-white p-2 rounded-md"
              />
            </div>
            <p className="text-gray-300">
              Empowering organizations through customized IT solutions to enhance efficiency and foster growth.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-medium text-white">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Team", "Projects", "Partners", "Contact Us", "Admin"].map((item) => (
                <li key={item}>
                  {item === "Admin" ? (
                    <Link href="/admin/login" className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </Link>
                  ) : (
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(item.toLowerCase().replace(/\s+/g, "-"))
                        if (element) {
                          window.scrollTo({
                            top: element.offsetTop - 80,
                            behavior: "smooth",
                          })
                        }
                      }}
                    >
                      {item}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-medium text-white">Services</h3>
            <ul className="space-y-2">
              {[
                "Software Development",
                "IT Consulting",
                "Training & Development",
                "Digital Transformation",
                "Project Management",
                "IT Infrastructure",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById("services")
                      if (element) {
                        window.scrollTo({
                          top: element.offsetTop - 80,
                          behavior: "smooth",
                        })
                      }
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-medium text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-center justify-center md:justify-start">
                <Mail className="h-5 w-5 text-[#D4A017]" />
                <span className="text-gray-300">clebutexpert@gmail.com</span>
              </li>
              <li className="flex gap-3 items-center justify-center md:justify-start">
                <Phone className="h-5 w-5 text-[#D4A017]" />
                <span className="text-gray-300">+250 783 397 469</span>
              </li>
              <li className="flex gap-3 items-center justify-center md:justify-start">
                <Briefcase className="h-5 w-5 text-[#D4A017]" />
                <span className="text-gray-300">www.clebut.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} CLÉ-BUT EXPERTS. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
