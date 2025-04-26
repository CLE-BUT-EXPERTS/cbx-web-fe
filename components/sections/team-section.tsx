"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Linkedin, Mail, Twitter } from "lucide-react"

export default function TeamSection() {
  const teamRef = useRef(null)
  const teamInView = useInView(teamRef, { once: true })

  const teamMembers = [
    {
      name: "Viateur AKUZWE",
      position: "General Coordinator",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219411/clebut/d59rvhwnhkx3vmacehzl.png",
      social: {
        linkedin: "https://linkedin.com/in/viateur-akuzwe",
        twitter: "https://twitter.com/viateur_akuzwe",
        email: "mailto:viateur@clebut.com",
      },
    },
    {
      name: "Cedrick HAKUZIMANA",
      position: "Operation Coordinator",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219410/clebut/lucge4ibqiqytxily6ri.png",
      social: {
        linkedin: "https://linkedin.com/in/cedrick-hakuzimana",
        twitter: "https://twitter.com/cedrick_hakuzimana",
        email: "mailto:cedrick@clebut.com",
      },
    },
    {
      name: "Jean Pierre AKIMANA",
      position: "Chief Innovation Officer",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219408/clebut/zrhl4fskyserdd2ig2iq.png",
      social: {
        linkedin: "https://linkedin.com/in/jeanpierre-akimana",
        twitter: "https://twitter.com/jp_akimana",
        email: "mailto:jeanpierre@clebut.com",
      },
    },
    {
      name: "Jolly NAMARA",
      position: "General Secretary",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219410/clebut/tjwgtukzrmnhlmqywndi.png",
      social: {
        linkedin: "https://linkedin.com/in/jolly-namara",
        twitter: "https://twitter.com/jolly_namara",
        email: "mailto:jolly@clebut.com",
      },
    },
    {
      name: "Leonore RAMBA",
      position: "Training Manager",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219408/clebut/xourp6rid43ek6etl8dd.png",
      social: {
        linkedin: "https://linkedin.com/in/leonore-ramba",
        twitter: "https://twitter.com/leonore_ramba",
        email: "mailto:leonore@clebut.com",
      },
    },
    {
      name: "Celebre ISHIMWE",
      position: "Digital Experience Lead",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745569657/clebut/eocjtjhcl8lkqi0kwwyo.png",
      social: {
        linkedin: "https://linkedin.com/in/celebre-ishimwe",
        twitter: "https://twitter.com/celebre_ishimwe",
        email: "mailto:celebre@clebut.com",
      },
    },
    {
      name: "Vainqueur NIYONYUNGU",
      position: "Software Engineer",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219412/clebut/ze63paamksnzd3kujomm.png",
      social: {
        linkedin: "https://linkedin.com/in/vainqueur-niyonyungu",
        twitter: "https://twitter.com/vainqueur_niyo",
        email: "mailto:vainqueur@clebut.com",
      },
    },
    {
      name: "Christian ISHIMWE",
      position: "Software Engineer",
      image: "https://res.cloudinary.com/ddlhho2lk/image/upload/v1745219408/clebut/fneeigs713qjds3pkrwh.png",
      social: {
        linkedin: "https://linkedin.com/in/christian-ishimwe",
        twitter: "https://twitter.com/christian_ishimwe",
        email: "mailto:christian@clebut.com",
      },
    },
  ]

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
              key={index}
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
                    alt={member.name}
                    width={300}
                    height={225}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Social icons that appear on hover */}
                  <div className="team-social-icons">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin size={16} className="text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      aria-label={`${member.name}'s Twitter profile`}
                    >
                      <Twitter size={16} className="text-white" />
                    </a>
                    <a
                      href={member.social.email}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={16} className="text-white" />
                    </a>
                  </div>

                  {/* Overlay with name and position */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004D40]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"></div>
                </div>

                {/* Name and position - outside the image */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#D4A017] text-white p-3 text-center">
                  <h3 className="font-bold text-sm md:text-base">{member.name}</h3>
                  <p className="text-xs md:text-sm text-white/90 mt-1">{member.position}</p>
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
