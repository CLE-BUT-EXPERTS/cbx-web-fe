"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Mail } from "lucide-react"
import axios from "axios"

type TeamMember = {
  id: string | number
  firstname: string
  lastname: string
  email: string
  image: string | null
  title: string
  bio: string
}

export default function TeamSection() {
  const teamRef = useRef(null)
  const teamInView = useInView(teamRef, { once: true })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/1`)
        console.log("Team API response:", res.data)
        // Try to find users in different possible locations
        const data =
          res.data?.data?.users ||
          res.data?.users ||
          res.data?.data?.team ||
          res.data?.team ||
          []
        let membersArr: TeamMember[] = []
        if (Array.isArray(data)) {
          membersArr = data
        } else if (typeof data === "object" && data !== null) {
          membersArr = Object.values(data)
        }
        setTeamMembers(membersArr)
      } catch (e) {
        setTeamMembers([])
        if (axios.isAxiosError(e)) {
          console.error("Failed to fetch team members:", e.response?.data || e.message)
        } else {
          console.error("Failed to fetch team members:", e)
        }
      }
    }
    fetchTeam()
  }, [])

  return (
    <section id="team" ref={teamRef} className="w-full py-20 md:py-32 bg-gray-50 relative">
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,0L80,10.7C160,21,320,43,480,42.7C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      <div className="container px-4 sm:px-8 relative z-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#004D40] mb-4">
              MEET <span className="text-[#D4A017]">THE</span> TEAM
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 mt-4">
              Our team of dedicated professionals brings together diverse expertise to deliver exceptional results.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden team-card team-card-slant h-64 md:h-72">
                {/* Image */}
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.firstname} ${member.lastname}`}
                    width={300}
                    height={225}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Email icon only */}
                  <div className="team-social-icons">
                    <a
                      href={`mailto:${member.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      aria-label={`Email ${member.firstname} ${member.lastname}`}
                    >
                      <Mail size={16} className="text-white" />
                    </a>
                  </div>

                  {/* Overlay with name and position */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004D40]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"></div>
                </div>

                {/* Name and position - outside the image */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#D4A017] text-white p-3 text-center">
                  <h3 className="font-bold text-sm md:text-base">{member.firstname} {member.lastname}</h3>
                  <p className="text-xs md:text-sm text-white/90 mt-1">{member.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl md:text-2xl font-bold text-[#004D40]">
            WE <span className="text-[#D4A017]">EMPOWER</span> • <span className="text-[#D4A017]">CONNECT</span> •{" "}
            <span className="text-[#D4A017]">TRANSFORM</span>
          </p>
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
