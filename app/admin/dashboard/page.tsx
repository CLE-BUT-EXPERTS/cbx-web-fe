"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  type Message,
  type Partner,
  type Project,
  type Service,
  type TeamMember,
  type Testimonial,
  formatDate,
  useAdminStore,
} from "@/lib/data"
import TeamForm from "@/components/admin/team-form"
import ServiceForm from "@/components/admin/service-form"
import TestimonialForm from "@/components/admin/testimonial-form"
import PartnerForm from "@/components/admin/partner-form"
import AboutForm from "@/components/admin/about-form"
import ProjectForm from "@/components/admin/project-form"
import MessageDetail from "@/components/admin/message-detail"

export default function AdminDashboard() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isClient, setIsClient] = useState(false)

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

  // Get data from store
  const {
    teamMembers,
    services,
    projects,
    testimonials,
    partners,
    messages,
    aboutContent,
    stats,
    deleteTeamMember,
    deleteService,
    deleteProject,
    deleteTestimonial,
    deletePartner,
    deleteMessage,
    markMessageAsRead,
  } = useAdminStore()

  useEffect(() => {
    setIsClient(true)

    // Handle responsive sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleLogout = () => {
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
  }

  // Team member handlers
  const handleAddTeamMember = () => {
    openDialog("Add Team Member", <TeamForm onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleEditTeamMember = (member: TeamMember) => {
    setSelectedTeamMember(member)
    openDialog("Edit Team Member", <TeamForm member={member} onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleDeleteTeamMember = (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteTeamMember(id)
    }
  }

  // Service handlers
  const handleAddService = () => {
    openDialog("Add Service", <ServiceForm onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleEditService = (service: Service) => {
    setSelectedService(service)
    openDialog("Edit Service", <ServiceForm service={service} onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id)
    }
  }

  // Project handlers
  const handleAddProject = () => {
    openDialog("Add Project", <ProjectForm onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    openDialog("Edit Project", <ProjectForm project={project} onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id)
    }
  }

  // Testimonial handlers
  const handleAddTestimonial = () => {
    openDialog("Add Testimonial", <TestimonialForm onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    openDialog(
      "Edit Testimonial",
      <TestimonialForm testimonial={testimonial} onSuccess={closeDialog} onCancel={closeDialog} />,
    )
  }

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(id)
    }
  }

  // Partner handlers
  const handleAddPartner = () => {
    openDialog("Add Partner", <PartnerForm onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleEditPartner = (partner: Partner) => {
    setSelectedPartner(partner)
    openDialog("Edit Partner", <PartnerForm partner={partner} onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  const handleDeletePartner = (id: string) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      deletePartner(id)
    }
  }

  // About content handlers
  const handleEditAboutContent = () => {
    openDialog("Edit Mission & Vision", <AboutForm onSuccess={closeDialog} onCancel={closeDialog} />)
  }

  // Message handlers
  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markMessageAsRead(message.id)
    }
  }

  const handleCloseMessage = () => {
    setSelectedMessage(null)
  }

  const handleDeleteMessage = (id: string) => {
    deleteMessage(id)
    setSelectedMessage(null)
  }

  if (!isClient) {
    return null
  }

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
                e.preventDefault() // Prevent default navigation
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
                e.preventDefault() // Prevent default navigation
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
                e.preventDefault() // Prevent default navigation
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
                e.preventDefault() // Prevent default navigation
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
          </nav>

          <div className="px-4 mt-8 mb-2 text-xs uppercase text-white/50">{!sidebarCollapsed && "Account"}</div>
          <nav>
            <Link
              href="#"
              className={`sidebar-link ${activeTab === "settings" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault() // Prevent default navigation
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
              onClick={(e) => {
                // Don't prevent default for this one as we want to navigate to home
              }}
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
                    <h3 className="text-gray-500 text-sm font-medium">Total Visitors</h3>
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                      <Users size={20} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.visitors.toLocaleString()}</p>
                  <p className="text-sm text-green-500 mt-2">
                    <span className="font-medium">↑ 12.5%</span> from last month
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">New Inquiries</h3>
                    <div className="p-2 rounded-lg bg-green-50 text-green-500">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.inquiries}</p>
                  <p className="text-sm text-green-500 mt-2">
                    <span className="font-medium">↑ 8.2%</span> from last month
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">Projects Completed</h3>
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-500">
                      <BarChart3 size={20} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.projectsCompleted}</p>
                  <p className="text-sm text-green-500 mt-2">
                    <span className="font-medium">↑ 4.3%</span> from last month
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {messages.slice(0, 5).map((message, index) => (
                      <div
                        key={index}
                        className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${message.read ? "bg-gray-300" : "bg-blue-500"} mt-2 mr-3`}
                        ></div>
                        <div>
                          <h3 className="font-medium text-gray-800">{message.subject}</h3>
                          <p className="text-gray-600 text-sm">{message.name} sent a message</p>
                          <p className="text-gray-400 text-xs mt-1">{formatDate(message.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button className="w-full bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleAddTeamMember}>
                      Add New Team Member
                    </Button>
                    <Button className="w-full bg-[#D4A017] hover:bg-[#B8860B] text-white" onClick={handleAddProject}>
                      Create New Project
                    </Button>
                    <Button
                      className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      onClick={handleAddService}
                    >
                      Add New Service
                    </Button>
                    <Button
                      className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      onClick={handleAddTestimonial}
                    >
                      Add New Testimonial
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "content" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Tabs defaultValue="mission-vision" className="w-full overflow-x-auto">
                <TabsList className="mb-6 flex flex-wrap">
                  <TabsTrigger value="mission-vision">Mission & Vision</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                  <TabsTrigger value="partners">Partners</TabsTrigger>
                </TabsList>

                <TabsContent value="mission-vision">
                  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Mission & Vision</h2>
                      <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleEditAboutContent}>
                        <Edit size={16} className="mr-2" /> Edit
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-md font-medium text-gray-800 mb-2">Mission Statement</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700">{aboutContent.mission}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-md font-medium text-gray-800 mb-2">Vision Statement</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700">{aboutContent.vision}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

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
                              <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004D40] to-[#D4A017] flex items-center justify-center text-white text-lg font-bold mr-3">
                              {testimonial.author.charAt(0)}
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
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg overflow-hidden bg-white">
                      <div className="h-48 bg-gray-200 relative">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{member.position}</p>
                        <p className="text-sm text-gray-500 mt-1">{member.email}</p>

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
