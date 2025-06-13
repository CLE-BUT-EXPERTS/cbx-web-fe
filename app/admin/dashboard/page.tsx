"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Edit,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PenTool,
  Plus,
  Settings,
  Trash2,
  Users,
  X,
  ClipboardList,
  FileText,
  BookOpen
} from "lucide-react"
import axios from 'axios'
import Cookies from 'js-cookie'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TeamForm from "@/components/admin/team-form"
import ServiceForm from "@/components/admin/service-form"
import TestimonialForm from "@/components/admin/testimonial-form"
import PartnerForm from "@/components/admin/partner-form"
import ProjectForm from "@/components/admin/project-form"
import MessageDetail from "@/components/admin/message-detail"
import EnrollmentForm from "@/components/admin/enrollment-form"
import BlogForm from "@/components/admin/blog-form"
import CourseForm from "@/components/admin/course-form" // <-- Create this file
import { Badge } from "@/components/ui/badge"

// Enhanced type definitions
type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

type Partner = {
  id: string;
  name: string;
  image: string;
}

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  client: string;
  date: string;
}

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
}

type TeamMember = {
  id: string | number
  firstname: string
  lastname: string
  email: string
  phone: string
  gender: string
  image: string | null
  title: string
  bio: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
  socialMedias: any[]
}

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  position: string;
}

type Enrollment = {
  id: string;
  traineeName: string;
  email: string;
  phone: string;
  course: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

type Course = {
  id: string | number
  title: string
  description: string
  startDate: string
  location: string
  level: string
  price: number
  calculmn: string[]
  prequesites: string[]
  benefits: string[]
  userId: number
  coverImage: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Data states
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

  // Selected item states
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
const [expandedCourses, setExpandedCourses] = useState<{ [courseId: string]: boolean }>({});
const [selectedCourseTab, setSelectedCourseTab] = useState<string | number | null>(null)
const [showMoreStudents, setShowMoreStudents] = useState<{ [courseId: string]: boolean }>({}) 

// Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Fetch data from API
  const fetchData = async () => {
  try {
    setIsLoading(true);
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      console.error("API BASE URL is not set. Check your .env file and restart the dev server.");
      setIsLoading(false);
      return;
    }
    
    const token = Cookies.get('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Use Promise.allSettled instead of Promise.all to handle partial failures
    const [
      teamRes,
      servicesRes,
      projectsRes,
      testimonialsRes,
      partnersRes,
      messagesRes,
      enrollmentsRes,
      blogPostsRes,
      coursesRes
    ] = await Promise.allSettled([
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/partners`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-messages`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainee-enrollments/all`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/companyposts`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/company/1`, { headers })
    ]);

    // Process each response with proper error handling
    setTeamMembers(teamRes.status === 'fulfilled' && Array.isArray(teamRes.value.data?.data) ? teamRes.value.data.data : []);
    setServices(servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value.data) ? servicesRes.value.data : []);
    setProjects(projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value.data) ? projectsRes.value.data : []);
    setTestimonials(testimonialsRes.status === 'fulfilled' && Array.isArray(testimonialsRes.value.data) ? testimonialsRes.value.data : []);
    setPartners(partnersRes.status === 'fulfilled' && Array.isArray(partnersRes.value.data) ? partnersRes.value.data : []);
    setMessages(messagesRes.status === 'fulfilled' && Array.isArray(messagesRes.value.data) ? messagesRes.value.data : []);
    setEnrollments(enrollmentsRes.status === 'fulfilled' && Array.isArray(enrollmentsRes.value.data) ? enrollmentsRes.value.data : []);
    setBlogPosts(blogPostsRes.status === 'fulfilled' && Array.isArray(blogPostsRes.value.data) ? blogPostsRes.value.data : []);
    setCourses(coursesRes.status === 'fulfilled' && Array.isArray(coursesRes.value.data) ? coursesRes.value.data : []);

  } catch (error) {
    console.error("Error fetching data:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push('/admin/login');
    }
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
  setIsClient(true);
  const token = Cookies.get('token');
  if (!token) {
    router.push('/admin/login');
  }
}, []);

useEffect(() => {
  if (isClient) {
    fetchData();
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }
}, [isClient]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('userEmail')
    router.push("/admin/login")
  }

  // Dialog handlers
  const openDialog = (title: string, content: React.ReactNode) => {
    setDialogTitle(title)
    setDialogContent(content)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setSelectedTeamMember(null)
    setSelectedService(null)
    setSelectedProject(null)
    setSelectedTestimonial(null)
    setSelectedPartner(null)
    setSelectedEnrollment(null)
    setSelectedBlogPost(null)
    setSelectedCourse(null)
  }

  const handleApiError = (error: any, router: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      router.push('/admin/login')
    }
    const msg = error.response?.data?.message || error.message || 'An error occurred'
    alert(msg)
    throw new Error(msg)
  } else {
    console.error(error)
    throw error
  }
}

  // Generic CRUD operations
 const createItem = async (
  endpoint: string,
  data: any,
  setState: React.Dispatch<React.SetStateAction<any[]>>,
  fetchData?: () => void
) => {
  try {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/admin/login')
      return
    }
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
console.log("Token:", token)
console.log("Headers:", headers)
const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, data, { headers })
    if (fetchData) {
      await fetchData()
    } else if (response.data && response.data.data) {
      setState(prev => [...prev, response.data.data])
    }
    closeDialog()
    return response.data.data
  } catch (error) {
    handleApiError(error, router)
  }
}

const updateItem = async (
  endpoint: string,
  id: string | number,
  data: any,
  setState: React.Dispatch<any>,
  fetchData?: () => void
) => {
  try {
    const token = Cookies.get('token')
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (fetchData) {
      await fetchData()
    } else if (response.data && response.data.data) {
      setState((prev: any[]) => prev.map(item => item.id === id ? response.data.data : item))
    }
    closeDialog()
    return response.data.data
  } catch (error) {
    handleApiError(error, router)
  }
}

const deleteItem = async (
  endpoint: string,
  id: string | number,
  setState: React.Dispatch<React.SetStateAction<any[]>>,
  fetchData?: () => void
) => {
  try {
    const token = Cookies.get('token')
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (fetchData) {
      await fetchData()
    } else {
      setState(prev => prev.filter(item => item.id !== id))
    }
  } catch (error) {
    handleApiError(error, router)
  }
}

  // Team member operations
  const handleAddTeamMember = () => {
  openDialog("Add Team Member", 
    <TeamForm 
      onSave={async (member) => await createItem('users', member, setTeamMembers, fetchData)}
      onCancel={closeDialog}
    />
  )
}

const handleEditTeamMember = (member: TeamMember) => {
  setSelectedTeamMember(member)
  openDialog("Edit Team Member", 
    <TeamForm 
      member={member}
      onSave={async (updatedMember) => await updateItem('users', member.id, updatedMember, setTeamMembers, fetchData)}
      onCancel={closeDialog}
    />
  )
}

const handleDeleteTeamMember = async (id: string | number) => {
  if (window.confirm("Are you sure you want to delete this team member?")) {
    await deleteItem('users', id, setTeamMembers, fetchData)
  }
}

  // Service operations
  const handleAddService = () => {
    openDialog("Add Service", 
      <ServiceForm 
        onSave={(service) => createItem('services', service, setServices)}
        onCancel={closeDialog}
      />
    )
  }

  const handleEditService = (service: Service) => {
    setSelectedService(service)
    openDialog("Edit Service", 
      <ServiceForm 
        service={service}
        onSave={(updatedService) => updateItem('services', service.id, updatedService, setServices)}
        onCancel={closeDialog}
      />
    )
  }

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteItem('services', id, setServices)
    }
  }

  // Project operations
  const handleAddProject = () => {
    openDialog("Add Project", 
      <ProjectForm 
        onSave={(project) => createItem('projects', project, setProjects)}
        onCancel={closeDialog}
      />
    )
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    openDialog("Edit Project", 
      <ProjectForm 
        project={project}
        onSave={(updatedProject) => updateItem('projects', project.id, updatedProject, setProjects)}
        onCancel={closeDialog}
      />
    )
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteItem('projects', id, setProjects)
    }
  }

  // Testimonial operations
  const handleAddTestimonial = () => {
    openDialog("Add Testimonial", 
      <TestimonialForm 
        onSave={(testimonial) => createItem('testimonials', testimonial, setTestimonials)}
        onCancel={closeDialog}
      />
    )
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    openDialog("Edit Testimonial", 
      <TestimonialForm 
        testimonial={testimonial}
        onSave={(updatedTestimonial) => updateItem('testimonials', testimonial.id, updatedTestimonial, setTestimonials)}
        onCancel={closeDialog}
      />
    )
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      await deleteItem('testimonials', id, setTestimonials)
    }
  }

  // Partner operations
  const handleAddPartner = () => {
    openDialog("Add Partner", 
      <PartnerForm 
        onSave={(partner) => createItem('partners', partner, setPartners)}
        onCancel={closeDialog}
      />
    )
  }

  const handleEditPartner = (partner: Partner) => {
    setSelectedPartner(partner)
    openDialog("Edit Partner", 
      <PartnerForm 
        partner={partner}
        onSave={(updatedPartner) => updateItem('partners', partner.id, updatedPartner, setPartners)}
        onCancel={closeDialog}
      />
    )
  }

  const handleDeletePartner = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      await deleteItem('partners', id, setPartners)
    }
  }

  // Message operations
  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markMessageAsRead(message.id)
    }
  }

  const markMessageAsRead = async (id: string) => {
    try {
      const token = Cookies.get('token')
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/messages/${id}/read`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const handleCloseMessage = () => {
    setSelectedMessage(null)
  }

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteItem('messages', id, setMessages)
      setSelectedMessage(null)
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  // Enrollment operations
  const handleEditEnrollment = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment)
    openDialog("Edit Enrollment", 
      <EnrollmentForm 
        enrollment={enrollment}
        onSave={(updatedEnrollment) => updateItem('enrollments', enrollment.id, updatedEnrollment, setEnrollments)}
        onCancel={closeDialog}
      />
    )
  }

  const handleDeleteEnrollment = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      await deleteItem('enrollments', id, setEnrollments)
    }
  }

  const updateEnrollmentStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const token = Cookies.get('token')
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/enrollments/${id}/status`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setEnrollments(enrollments.map(e => e.id === id ? response.data.data : e))
    } catch (error) {
      console.error("Error updating enrollment status:", error)
    }
  }

  // Blog operations
  const handleAddBlogPost = () => {
  openDialog("Add Blog Post", 
    <BlogForm 
      onSave={(blogPost) => {
        setBlogPosts(prev => [blogPost, ...prev])
        closeDialog()
        fetchData()
      }}
      onCancel={closeDialog}
    />
  )
}

const handleEditBlogPost = (blogPost: BlogPost) => {
  setSelectedBlogPost(blogPost)
  openDialog("Edit Blog Post", 
    <BlogForm 
      blogPost={blogPost}
      onSave={(updatedBlogPost) => {
        setBlogPosts(prev => prev.map(post => post.id === updatedBlogPost.id ? updatedBlogPost : post))
        closeDialog()
        fetchData()
      }}
      onCancel={closeDialog}
    />
  )
}

  const handleDeleteBlogPost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      await deleteItem('blog-posts', id, setBlogPosts)
    }
  }

  // Course CRUD
  // Add Course
const handleAddCourse = () => {
  openDialog("Add Course", 
    <CourseForm 
      onSave={(course) => {
        setCourses(prev => [course, ...prev])
        closeDialog()
        fetchData()
      }}
      onCancel={closeDialog}
    />
  )
}

const handleEditCourse = (course: Course) => {
  setSelectedCourse(course)
  openDialog("Edit Course", 
    <CourseForm 
      course={course}
      onSave={(updatedCourse) => {
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c))
        closeDialog()
        fetchData()
      }}
      onCancel={closeDialog}
    />
  )
}

// Delete Course
const handleDeleteCourse = async (id: string | number) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    await deleteItem('course', id, setCourses, fetchData)
  }
}

  const totalUsers = useMemo(() => teamMembers.length, [teamMembers])
  const totalTrainees = useMemo(() => enrollments.length, [enrollments])
  const totalPartners = useMemo(() => partners.length, [partners])

  const recentEnrollments = useMemo(() => enrollments.slice(0, 5), [enrollments])
  const recentMessages = useMemo(() => messages.slice(0, 5), [messages])

  if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004D40]"></div>
    </div>
  )
}

  // if (!isClient) {
  //   return null
  // }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar ${sidebarCollapsed ? "collapsed" : ""} z-20 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="CLÉ-BUT EXPERTS"
                width={100}
                height={40}
                className="h-auto bg-white p-1 rounded-md"
              />
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors hidden md:block"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-4">
          <div className="px-4 mb-2 text-xs uppercase text-white/50">{!sidebarCollapsed && "Main"}</div>
          <nav>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("dashboard")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <LayoutDashboard size={20} className="mr-3" />
              {!sidebarCollapsed && "Dashboard"}
            </Link>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "content" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("content")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <PenTool size={20} className="mr-3" />
              {!sidebarCollapsed && "Content Management"}
            </Link>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "team" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("team")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <Users size={20} className="mr-3" />
              {!sidebarCollapsed && "Team Members"}
            </Link>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "messages" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("messages")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <MessageSquare size={20} className="mr-3" />
              {!sidebarCollapsed && "Messages"}
              {!sidebarCollapsed && messages.filter((m) => !m.read).length > 0 && (
                <span className="ml-auto bg-[#D4A017] text-white text-xs px-2 py-1 rounded-full">
                  {messages.filter((m) => !m.read).length}
                </span>
              )}
            </Link>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "enrollments" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("enrollments")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <ClipboardList size={20} className="mr-3" />
              {!sidebarCollapsed && "Enrollments"}
            </Link>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "blog" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("blog")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <FileText size={20} className="mr-3" />
              {!sidebarCollapsed && "Blog Posts"}
            </Link>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "courses" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("courses")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <BookOpen size={20} className="mr-3" />
              {!sidebarCollapsed && "Courses"}
            </Link>
          </nav>

          <div className="px-4 mt-8 mb-2 text-xs uppercase text-white/50">{!sidebarCollapsed && "Account"}</div>
          <nav>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "settings" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab("settings")
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(false)
                }
              }}
            >
              <Settings size={20} className="mr-3" />
              {!sidebarCollapsed && "Settings"}
            </Link>
            <Link
              href="/"
              className="sidebar-link"
            >
              <Home size={20} className="mr-3" />
              {!sidebarCollapsed && "View Website"}
            </Link>
            <button onClick={handleLogout} className="sidebar-link w-full text-left">
              <LogOut size={20} className="mr-3" />
              {!sidebarCollapsed && "Logout"}
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={`dashboard-content ${sidebarCollapsed ? "expanded" : ""} w-full bg-gray-50`}>
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden mr-2"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#004D40] flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-4 sm:p-6">
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                      <Users size={20} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{totalUsers}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Trainee Enrollments</h3>
                    <div className="p-2 rounded-lg bg-green-50 text-green-500">
                      <ClipboardList size={20} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{totalTrainees}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Partners</h3>
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-500">
                      <Users size={20} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{totalPartners}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Trainee Enrollments</h2>
                  <div className="space-y-4">
                    {recentEnrollments.length === 0 ? (
                      <p className="text-gray-500">No recent enrollments</p>
                    ) : (
                      recentEnrollments.map((enrollment) => (
                        <div key={enrollment.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                          <div>
                            <h3 className="font-medium text-gray-800">{enrollment.traineeName}</h3>
                            <p className="text-gray-600 text-sm">{enrollment.course}</p>
                            <p className="text-gray-400 text-xs mt-1">{formatDate(enrollment.date)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Contact Messages</h2>
                  <div className="space-y-4">
                    {recentMessages.length === 0 ? (
                      <p className="text-gray-500">No recent messages</p>
                    ) : (
                      recentMessages.map((message) => (
                        <div key={message.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className={`w-2 h-2 rounded-full ${message.read ? "bg-gray-300" : "bg-blue-500"} mt-2 mr-3`}></div>
                          <div>
                            <h3 className="font-medium text-gray-800">{message.subject}</h3>
                            <p className="text-gray-600 text-sm">{message.name} sent a message</p>
                            <p className="text-gray-400 text-xs mt-1">{formatDate(message.date)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "content" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Tabs defaultValue="services" className="w-full overflow-x-auto">
                <TabsList className="mb-6 flex flex-wrap">
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                  <TabsTrigger value="partners">Partners</TabsTrigger>
                </TabsList>

                <TabsContent value="services">
                  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Services</h2>
                      <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddService}>
                        <Plus size={16} className="mr-2" /> Add Service
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Service
                            </th>
                            <th
                              scope="col"
                              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Icon
                            </th>
                            <th
                              scope="col"
                              className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {services.map((service) => (
                            <tr key={service.id}>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{service.title}</div>
                              </td>
                              <td className="px-4 sm:px-6 py-4">
                                <div className="text-sm text-gray-500 line-clamp-2">{service.description}</div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{service.icon}</div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  className="text-[#004D40] hover:text-[#00695C] mr-4"
                                  onClick={() => handleEditService(service)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="projects">
                  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Projects</h2>
                      <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddProject}>
                        <Plus size={16} className="mr-2" /> Add Project
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project) => (
                        <div key={project.id} className="border rounded-lg overflow-hidden bg-white">
                          <div className="h-40 bg-gray-200 relative">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">{project.title}</h3>
                                <p className="text-sm text-gray-500">{project.client}</p>
                              </div>
                              <span className="text-xs text-gray-500">{project.date}</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{project.description}</p>
                            <div className="mt-4 flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditProject(project)}
                              >
                                <Edit size={14} className="mr-1" /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 border-red-200"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash2 size={14} className="mr-1" /> Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="testimonials">
                  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Testimonials</h2>
                      <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddTestimonial}>
                        <Plus size={16} className="mr-2" /> Add Testimonial
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 p-4 sm:p-6 rounded-lg relative">
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                              className="p-1 text-gray-500 hover:text-[#004D40]"
                              onClick={() => handleEditTestimonial(testimonial)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="p-1 text-gray-500 hover:text-red-600"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <blockquote className="text-gray-700 italic mb-4">{testimonial.quote}</blockquote>
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full ...">
  {(testimonial.author || "?").charAt(0)}
</div>
                            <div>
                              <p className="font-medium text-gray-900">{testimonial.author}</p>
                              <p className="text-sm text-gray-500">{testimonial.position}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="partners">
                  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Strategic Alliances</h2>
                      <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddPartner}>
                        <Plus size={16} className="mr-2" /> Add Partner
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      {partners.map((partner) => (
                        <div key={partner.id} className="border rounded-lg p-4 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                            <button
                              className="p-1 text-gray-500 hover:text-[#004D40] bg-white rounded-full shadow-sm"
                              onClick={() => handleEditPartner(partner)}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="p-1 text-gray-500 hover:text-red-600 bg-white rounded-full shadow-sm"
                              onClick={() => handleDeletePartner(partner.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="h-20 flex items-center justify-center mb-2">
                            <Image
                              src={partner.image || "/placeholder.svg"}
                              alt={partner.name}
                              width={160}
                              height={80}
                              className="max-h-16 w-auto"
                            />
                          </div>
                          <p className="text-sm text-center text-gray-700">{partner.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Team Members</h2>
                  <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddTeamMember}>
                    <Plus size={16} className="mr-2" /> Add Team Member
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                 
{teamMembers.map((member, index) => (
  <div key={index} className="border rounded-lg overflow-hidden bg-white">
    <div className="h-48 bg-gray-200 relative">
      <Image
        src={member.image || "/placeholder.svg"}
        alt={`${member.firstname} ${member.lastname}`}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-medium text-lg">{member.firstname} {member.lastname}</h3>
      <p className="text-sm text-gray-500 font-medium">{member.title}</p>
      <p className="text-sm text-gray-500 mt-1">{member.email}</p>
      <p className="text-sm text-gray-400 mt-1">{member.bio}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => handleEditTeamMember(member)}>
          <Edit size={14} className="mr-1" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:bg-red-50 border-red-200"
          onClick={() => handleDeleteTeamMember(member.id)}
        >
          <Trash2 size={14} className="mr-1" /> Delete
        </Button>
      </div>
    </div>
  </div>
))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                {selectedMessage ? (
                  <MessageDetail
                    message={selectedMessage}
                    onClose={handleCloseMessage}
                    onDelete={() => handleDeleteMessage(selectedMessage.id)}
                  />
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Contact Messages</h2>
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No messages yet</p>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${message.read ? "bg-white border-gray-200" : "bg-blue-50 border-blue-100"}`}
                            onClick={() => handleViewMessage(message)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-gray-900 flex items-center">
                                  {message.name}
                                  {!message.read && <span className="ml-2 bg-blue-500 rounded-full w-2 h-2"></span>}
                                </h3>
                                <p className="text-sm text-gray-500">{message.email}</p>
                              </div>
                              <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-2">{message.subject}</h4>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{message.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

     
{activeTab === "enrollments" && (() => {
  // Group enrollments by course
  const courseGroups = enrollments.reduce((acc: any, enrollment: any) => {
    const courseId = enrollment.Course?.id || "Unknown"
    if (!acc[courseId]) acc[courseId] = { course: enrollment.Course, students: [] }
    acc[courseId].students.push(enrollment)
    return acc
  }, {})

  const courseIds = Object.keys(courseGroups)
  const activeCourseId = selectedCourseTab ?? courseIds[0]
  const activeGroup = courseGroups[activeCourseId] || { course: {}, students: [] }
  const students = activeGroup.students || []
  const showAll = showMoreStudents[activeCourseId]
  const studentsToShow = showAll ? students : students.slice(0, 3)

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Course Enrollments</h2>
        {/* Tabs for courses */}
        <div className="flex flex-wrap gap-2 mb-6">
          {courseIds.map((courseId) => (
            <button
              key={courseId}
              className={`px-4 py-2 rounded-lg border ${activeCourseId === courseId ? "bg-[#004D40] text-white border-[#004D40]" : "bg-gray-100 text-gray-700 border-gray-200"}`}
              onClick={() => setSelectedCourseTab(courseId)}
            >
              {courseGroups[courseId].course?.title || "Unknown Course"} ({courseGroups[courseId].students.length})
            </button>
          ))}
        </div>
        {/* Student cards */}
        <div className="space-y-4">
          {studentsToShow.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No students enrolled for this course.</div>
          ) : (
            studentsToShow.map((enrollment: any) => (
              <div key={enrollment.id} className="bg-white rounded-lg border p-4 shadow-sm w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <div className="font-medium text-gray-800">{enrollment.fullName}</div>
                    <div className="text-sm text-gray-500">{enrollment.email} | {enrollment.phone}</div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 sm:mt-0">
                    Applied: {new Date(enrollment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Experience Level:</span> {enrollment.experienceLevel}
                  </div>
                  <div>
                    <span className="font-semibold">Learning Goals:</span> {enrollment.learningGoals}
                  </div>
                  <div>
                    <span className="font-semibold">Availability:</span> {enrollment.availability?.join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold">Learning Style:</span> {enrollment.learningStyle?.join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold">Accessibility Needs:</span> {enrollment.accessibilityNeeds}
                  </div>
                  <div>
                    <span className="font-semibold">Agreed to Terms:</span> {enrollment.agreeToTerms ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteEnrollment(enrollment.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Show more/less button */}
        {students.length > 3 && (
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={() =>
                setShowMoreStudents((prev) => ({
                  ...prev,
                  [activeCourseId]: !prev[activeCourseId],
                }))
              }
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
})()}

{activeTab === "courses" && (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Courses</h2>
        <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddCourse}>
          <Plus size={16} className="mr-2" /> Add Course
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">No courses found</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium">{course.title}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{course.level}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{course.location}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{course.startDate}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{course.price}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEditCourse(course)}
                    >
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
)}


{activeTab === "blog" && (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Blog Posts</h2>
        <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddBlogPost}>
          <Plus size={16} className="mr-2" /> Add Blog Post
        </Button>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-64 h-48 lg:h-32 bg-gray-200 rounded-lg relative flex-shrink-0">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{post.title}</h3>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditBlogPost(post)}
                    >
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => handleDeleteBlogPost(post.id)}
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Account Settings</h2>
                <p className="text-gray-500">Settings page is under construction.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dialog for forms */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          {dialogContent}
        </DialogContent>
      </Dialog>
    </div>
  )
}
