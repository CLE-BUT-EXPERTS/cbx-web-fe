"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ServicesSection from "@/components/sections/services-section"
import StatsSection from "@/components/sections/stats-section"
import ProjectsSection from "@/components/sections/projects-section"
import PartnersSection from "@/components/sections/partners-section"
import TeamSection from "@/components/sections/team-section"
import CTASection from "@/components/sections/cta-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <ProjectsSection />
        <PartnersSection />
        <TeamSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
