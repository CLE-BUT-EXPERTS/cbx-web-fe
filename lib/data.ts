// Mock data store for the admin dashboard
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types
export type TeamMember = {
  id: string
  name: string
  position: string
  image: string
  email: string
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
}

export type Project = {
  id: string
  title: string
  client: string
  description: string
  fullDescription: string
  image: string
  date: string
  duration: string
  technologies: string[]
  results: string[]
  testimonial: {
    quote: string
    author: string
    position: string
  }
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  position: string
}

export type Partner = {
  id: string
  name: string
  image: string
  website?: string
}

export type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export type AboutContent = {
  mission: string
  vision: string
}

// Initial data
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Viateur AKUZWE",
    position: "General Coordinator",
    image: "/placeholder.svg?height=400&width=300",
    email: "viateur@clebut.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "viateur@clebut.com",
    },
  },
  {
    id: "2",
    name: "Vainqueur NIYONYUNGU",
    position: "Software Engineer",
    image: "/placeholder.svg?height=400&width=300",
    email: "vainqueur@clebut.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "vainqueur@clebut.com",
    },
  },
  {
    id: "3",
    name: "Jolly NAMARA",
    position: "General Secretary",
    image: "/placeholder.svg?height=400&width=300",
    email: "jolly@clebut.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "jolly@clebut.com",
    },
  },
  {
    id: "4",
    name: "Christian ISHIMWE",
    position: "Software Engineer",
    image: "/placeholder.svg?height=400&width=300",
    email: "christian@clebut.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "christian@clebut.com",
    },
  },
  {
    id: "5",
    name: "Cedrick HAKUZIMANA",
    position: "Operation Coordinator",
    image: "/placeholder.svg?height=400&width=300",
    email: "cedrick@clebut.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "cedrick@clebut.com",
    },
  },
  {
    id: "6",
    name: "Leonore RAMBA",
    position: "Training Manager",
    image: "/placeholder.svg?height=400&width=300",
    email: "leonore@clebut.com",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "leonore@clebut.com",
    },
  },
]

const initialServices: Service[] = [
  {
    id: "1",
    title: "Software Development",
    description:
      "Custom software solutions designed to address your specific business challenges and streamline operations.",
    icon: "code",
  },
  {
    id: "2",
    title: "IT Consulting",
    description:
      "Strategic guidance to help you leverage technology effectively and make informed decisions for your business.",
    icon: "book-open",
  },
  {
    id: "3",
    title: "Training & Development",
    description:
      "Comprehensive training programs to equip your team with the skills needed to thrive in today's digital landscape.",
    icon: "users",
  },
  {
    id: "4",
    title: "Digital Transformation",
    description: "End-to-end solutions to help your organization embrace digital technologies and stay competitive.",
    icon: "box",
  },
  {
    id: "5",
    title: "Project Management",
    description:
      "Expert project management services to ensure your IT initiatives are delivered on time and within budget.",
    icon: "layout",
  },
  {
    id: "6",
    title: "IT Infrastructure",
    description:
      "Robust infrastructure solutions to provide a solid foundation for your business operations and growth.",
    icon: "server",
  },
]

const initialProjects: Project[] = [
  {
    id: "erp-system",
    title: "Enterprise Resource Planning System",
    client: "National Bank",
    description:
      "Developed and implemented a comprehensive ERP system to streamline operations and improve efficiency.",
    fullDescription: `
      <p>The National Bank approached us with a challenge: their legacy systems were siloed, causing inefficiencies and data inconsistencies across departments. They needed a modern, integrated ERP solution that could unify their operations while maintaining the highest security standards required in the financial sector.</p>
      
      <p>Our team conducted an extensive analysis of their existing workflows and systems, identifying key pain points and opportunities for improvement. We then designed and developed a custom ERP solution that integrated finance, human resources, procurement, and customer relationship management into a single, cohesive platform.</p>
      
      <p>The implementation was phased over 18 months, with careful data migration and comprehensive training programs to ensure a smooth transition. We worked closely with the bank's IT team to ensure the system met their stringent security requirements and regulatory compliance needs.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "January 2023",
    duration: "18 months",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker", "Kubernetes"],
    results: [
      "30% reduction in operational costs",
      "50% faster financial reporting",
      "99.9% system uptime",
      "Improved data accuracy and consistency",
      "Enhanced regulatory compliance",
    ],
    testimonial: {
      quote:
        "The ERP system developed by CLÉ-BUT EXPERTS has transformed our operations. We now have real-time visibility across all departments, enabling faster decision-making and improved customer service. The team at CLÉ-BUT EXPERTS was professional, responsive, and truly understood our business needs.",
      author: "Sarah Johnson",
      position: "CIO, National Bank",
    },
  },
  {
    id: "digital-learning",
    title: "Digital Learning Platform",
    client: "Ministry of Education",
    description: "Created an interactive digital learning platform to enhance educational outcomes and accessibility.",
    fullDescription: `
      <p>The Ministry of Education sought to modernize the country's educational system by implementing a digital learning platform that would be accessible to students across the nation, regardless of their location or socioeconomic status. The goal was to provide equal access to quality educational resources and improve learning outcomes nationwide.</p>
      
      <p>Our team designed and developed a comprehensive digital learning platform that works both online and offline, ensuring accessibility even in areas with limited internet connectivity. The platform includes interactive lessons, assessments, progress tracking, and collaboration tools for students and teachers.</p>
      
      <p>We implemented a user-centered design approach, conducting extensive research with students, teachers, and administrators to ensure the platform met their needs. The solution was built with scalability in mind, allowing for future expansion and integration with other educational tools and systems.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "March 2022",
    duration: "12 months",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Progressive Web App", "WebRTC"],
    results: [
      "Reached over 500,000 students nationwide",
      "25% improvement in standardized test scores",
      "90% teacher satisfaction rate",
      "Reduced educational inequality in rural areas",
      "Enabled continuous learning during pandemic restrictions",
    ],
    testimonial: {
      quote:
        "The digital learning platform has revolutionized education in our country. Students who previously had limited access to quality educational resources now have the world at their fingertips. The platform's intuitive design and offline capabilities have made it accessible to all, regardless of location or internet connectivity.",
      author: "Michael Nkurunziza",
      position: "Director of Digital Transformation, Ministry of Education",
    },
  },
  {
    id: "supply-chain",
    title: "Supply Chain Management Solution",
    client: "Global Logistics Company",
    description:
      "Designed a custom supply chain management solution to optimize logistics operations and reduce costs.",
    fullDescription: `
      <p>A leading global logistics company was facing challenges with their supply chain visibility, inventory management, and operational efficiency. They needed a modern solution that could provide real-time tracking, predictive analytics, and seamless integration with their existing systems and partner networks.</p>
      
      <p>Our team developed a comprehensive supply chain management solution that leverages IoT sensors, blockchain technology, and advanced analytics to provide end-to-end visibility and optimization. The system tracks shipments in real-time, predicts potential disruptions, and automatically suggests alternative routes or solutions.</p>
      
      <p>We implemented the solution in phases, starting with core functionality and gradually adding more advanced features. Throughout the process, we worked closely with the client's team to ensure smooth integration with their existing systems and to provide training for all users.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 2022",
    duration: "15 months",
    technologies: ["Python", "Django", "React", "IoT", "Blockchain", "Machine Learning", "AWS"],
    results: [
      "22% reduction in logistics costs",
      "35% decrease in delivery delays",
      "40% improvement in inventory accuracy",
      "Real-time visibility across the entire supply chain",
      "Enhanced customer satisfaction through reliable delivery estimates",
    ],
    testimonial: {
      quote:
        "The supply chain management solution developed by CLÉ-BUT EXPERTS has transformed our operations. We now have unprecedented visibility into our entire supply chain, allowing us to identify and address issues before they impact our customers. The predictive analytics capabilities have been particularly valuable in helping us navigate global supply chain disruptions.",
      author: "Robert Chen",
      position: "COO, Global Logistics Company",
    },
  },
  {
    id: "healthcare-system",
    title: "Healthcare Information System",
    client: "Regional Hospital Network",
    description:
      "Implemented a secure healthcare information system to improve patient care and administrative efficiency.",
    fullDescription: `
      <p>A regional network of hospitals was struggling with fragmented patient records, inefficient administrative processes, and challenges in coordinating care across multiple facilities. They needed an integrated healthcare information system that could unify patient data while maintaining the highest standards of security and compliance with healthcare regulations.</p>
      
      <p>Our team designed and implemented a comprehensive healthcare information system that includes electronic health records (EHR), appointment scheduling, billing, pharmacy management, and analytics. The system enables secure sharing of patient information across facilities, streamlines administrative workflows, and provides valuable insights for improving care quality and operational efficiency.</p>
      
      <p>We paid special attention to user experience, working closely with healthcare professionals to ensure the system was intuitive and efficient to use in fast-paced clinical environments. The solution was built with strict adherence to healthcare data protection regulations and includes robust security features to protect sensitive patient information.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "September 2022",
    duration: "20 months",
    technologies: ["Java", "Spring Boot", "Angular", "Oracle", "FHIR", "HL7", "Azure"],
    results: [
      "45% reduction in administrative time",
      "60% faster access to patient records",
      "28% decrease in medication errors",
      "Improved coordination of care across facilities",
      "Enhanced billing accuracy and revenue cycle management",
    ],
    testimonial: {
      quote:
        "The healthcare information system has transformed how we deliver care. Our clinicians now have immediate access to complete patient information, allowing them to make better-informed decisions. The administrative efficiencies have allowed us to focus more resources on patient care, and the analytics capabilities have helped us identify opportunities for continuous improvement.",
      author: "Dr. Emily Kagame",
      position: "Chief Medical Officer, Regional Hospital Network",
    },
  },
]

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "CLÉ-BUT EXPERTS has been an invaluable partner in our digital transformation journey. Their expertise and dedication have helped us achieve remarkable results.",
    author: "Sarah Johnson",
    position: "CTO, Global Financial Services",
  },
  {
    id: "2",
    quote:
      "Working with CLÉ-BUT EXPERTS has been a game-changer for our organization. Their innovative solutions and strategic guidance have significantly improved our operational efficiency.",
    author: "Michael Chen",
    position: "Director of IT, National Education Board",
  },
]

const initialPartners: Partner[] = [
  { id: "1", name: "Partner 1", image: "/placeholder.svg?height=80&width=160&text=Partner 1" },
  { id: "2", name: "Partner 2", image: "/placeholder.svg?height=80&width=160&text=Partner 2" },
  { id: "3", name: "Partner 3", image: "/placeholder.svg?height=80&width=160&text=Partner 3" },
  { id: "4", name: "Partner 4", image: "/placeholder.svg?height=80&width=160&text=Partner 4" },
  { id: "5", name: "Partner 5", image: "/placeholder.svg?height=80&width=160&text=Partner 5" },
  { id: "6", name: "Partner 6", image: "/placeholder.svg?height=80&width=160&text=Partner 6" },
  { id: "7", name: "Partner 7", image: "/placeholder.svg?height=80&width=160&text=Partner 7" },
  { id: "8", name: "Partner 8", image: "/placeholder.svg?height=80&width=160&text=Partner 8" },
  { id: "9", name: "Partner 9", image: "/placeholder.svg?height=80&width=160&text=Partner 9" },
  { id: "10", name: "Partner 10", image: "/placeholder.svg?height=80&width=160&text=Partner 10" },
]

const initialMessages: Message[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "ERP System Inquiry",
    message:
      "I'm interested in learning more about your ERP solutions for our financial institution. Could you provide more information about your experience in the banking sector?",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subject: "Digital Transformation Consultation",
    message:
      "We're looking to modernize our operations and would like to schedule a consultation to discuss how your services could help us achieve our digital transformation goals.",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    read: false,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    subject: "Training Program Inquiry",
    message:
      "I'm interested in your IT training programs for our staff. We have about 50 employees who need upskilling in various technologies. Could you send me information about your corporate training options?",
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    read: false,
  },
  {
    id: "4",
    name: "Emily Kagame",
    email: "emily.kagame@example.com",
    subject: "Healthcare IT Solutions",
    message:
      "Our hospital network is looking to upgrade our patient management system. Based on your case study with the Regional Hospital Network, I believe your solutions might be a good fit for us.",
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    read: true,
  },
  {
    id: "5",
    name: "Robert Nkusi",
    email: "robert.nkusi@example.com",
    subject: "Partnership Opportunity",
    message:
      "I represent a software company specializing in AI solutions. I'd like to discuss potential partnership opportunities that could benefit both our organizations.",
    date: new Date(Date.now() - 86400000 * 8).toISOString(), // 8 days ago
    read: true,
  },
]

const initialAboutContent: AboutContent = {
  mission:
    "Our mission is to empower public and private sectors through customized IT solutions, including software development, training, and consulting services. We strive to enhance efficiency and foster growth while bridging the digital divide by equipping organizations and future generations with essential technology skills. We are dedicated to implementing best practices that ensure sustainable progress through seamless IT integration.",
  vision:
    "Our vision is to create a future where technology enhances organizational performance and societal impact across all sectors. We aspire to be the leading catalyst for digital transformation, fostering an ecosystem where IT empowers both established organizations and emerging talents. We aim to build a digitally empowered world, ensuring that everyone is equipped to meet future challenges and seize opportunities.",
}

// Create the store
type AdminStore = {
  teamMembers: TeamMember[]
  services: Service[]
  projects: Project[]
  testimonials: Testimonial[]
  partners: Partner[]
  messages: Message[]
  aboutContent: AboutContent
  stats: {
    visitors: number
    inquiries: number
    projectsCompleted: number
  }

  // Team members actions
  addTeamMember: (member: Omit<TeamMember, "id">) => void
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void
  deleteTeamMember: (id: string) => void

  // Services actions
  addService: (service: Omit<Service, "id">) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void

  // Projects actions
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void

  // Testimonials actions
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void

  // Partners actions
  addPartner: (partner: Omit<Partner, "id">) => void
  updatePartner: (id: string, partner: Partial<Partner>) => void
  deletePartner: (id: string) => void

  // Messages actions
  addMessage: (message: Omit<Message, "id" | "date" | "read">) => void
  markMessageAsRead: (id: string) => void
  deleteMessage: (id: string) => void

  // About content actions
  updateAboutContent: (content: Partial<AboutContent>) => void

  // Stats actions
  incrementVisitors: (count?: number) => void
  incrementInquiries: (count?: number) => void
  incrementProjectsCompleted: (count?: number) => void
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      teamMembers: initialTeamMembers,
      services: initialServices,
      projects: initialProjects,
      testimonials: initialTestimonials,
      partners: initialPartners,
      messages: initialMessages,
      aboutContent: initialAboutContent,
      stats: {
        visitors: 12543,
        inquiries: 48,
        projectsCompleted: 24,
      },

      // Team members actions
      addTeamMember: (member) =>
        set((state) => ({
          teamMembers: [...state.teamMembers, { ...member, id: Date.now().toString() }],
        })),
      updateTeamMember: (id, member) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((m) => (m.id === id ? { ...m, ...member } : m)),
        })),
      deleteTeamMember: (id) =>
        set((state) => ({
          teamMembers: state.teamMembers.filter((m) => m.id !== id),
        })),

      // Services actions
      addService: (service) =>
        set((state) => ({
          services: [...state.services, { ...service, id: Date.now().toString() }],
        })),
      updateService: (id, service) =>
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...service } : s)),
        })),
      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),

      // Projects actions
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: Date.now().toString() }],
        })),
      updateProject: (id, project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      // Testimonials actions
      addTestimonial: (testimonial) =>
        set((state) => ({
          testimonials: [...state.testimonials, { ...testimonial, id: Date.now().toString() }],
        })),
      updateTestimonial: (id, testimonial) =>
        set((state) => ({
          testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...testimonial } : t)),
        })),
      deleteTestimonial: (id) =>
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        })),

      // Partners actions
      addPartner: (partner) =>
        set((state) => ({
          partners: [...state.partners, { ...partner, id: Date.now().toString() }],
        })),
      updatePartner: (id, partner) =>
        set((state) => ({
          partners: state.partners.map((p) => (p.id === id ? { ...p, ...partner } : p)),
        })),
      deletePartner: (id) =>
        set((state) => ({
          partners: state.partners.filter((p) => p.id !== id),
        })),

      // Messages actions
      addMessage: (message) =>
        set((state) => ({
          messages: [
            {
              ...message,
              id: Date.now().toString(),
              date: new Date().toISOString(),
              read: false,
            },
            ...state.messages,
          ],
        })),
      markMessageAsRead: (id) =>
        set((state) => ({
          messages: state.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
        })),
      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        })),

      // About content actions
      updateAboutContent: (content) =>
        set((state) => ({
          aboutContent: { ...state.aboutContent, ...content },
        })),

      // Stats actions
      incrementVisitors: (count = 1) =>
        set((state) => ({
          stats: { ...state.stats, visitors: state.stats.visitors + count },
        })),
      incrementInquiries: (count = 1) =>
        set((state) => ({
          stats: { ...state.stats, inquiries: state.stats.inquiries + count },
        })),
      incrementProjectsCompleted: (count = 1) =>
        set((state) => ({
          stats: { ...state.stats, projectsCompleted: state.stats.projectsCompleted + count },
        })),
    }),
    {
      name: "admin-store",
    },
  ),
)

// Helper function to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Today, " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } else if (diffDays === 1) {
    return "Yesterday, " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } else if (diffDays < 7) {
    return diffDays + " days ago"
  } else {
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
  }
}

// Helper function to generate a unique ID
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}
