"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

type Course = {
  id: string | number
  title: string
  description: string
  startDate: string
  location: string
  level: string
  price: number
  coverImage: string
}

type Testimonial = {
  id: string | number
  name: string
  role: string
  company: string
  image: string
  content: string
}

type Blog = {
  id: string | number
  title: string
  image: string
  content: string
  author: string
  date: string
  readTime: string
}

export default function EsomoTrainingProgram() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch courses
        const coursesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/company/1`
        )
        const coursesData = await coursesRes.json()
        setCourses(Array.isArray(coursesData) ? coursesData : [])

        // Fetch company info (testimonials and blogs)
        const companyRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/1`
        )
        const companyData = await companyRes.json()
        setTestimonials(companyData.testimonials || [])
        setBlogs(companyData.blogs || [])
      } catch (err) {
        setCourses([])
        setTestimonials([])
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Find the next course (by soonest startDate)
  const nextCourse = courses
    .filter((c) => c.startDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0]

  const stats = [
    { label: "Courses", value: courses.length ? `${courses.length}+` : "0" },
    { label: "Students", value: "5,000+" },
    { label: "Instructors", value: "25+" },
    { label: "Success Rate", value: "92%" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-[#004D40] text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-[#004D40] to-[#00695C] opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="container relative px-8 py-24 md:py-32 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium rounded-full mb-4">
                Transform Your Career
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">e-somo Training Program</h1>
              <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/90">
                An innovative training program designed for anyone who wants to learn new skills and advance their
                career. Join our hands-on courses and become an expert in your field.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#courses"
                  className="px-6 py-3 bg-white text-[#004D40] font-medium rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Explore Courses
                </Link>
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full bg-[#00695C] rounded-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#00897B] rounded-lg"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <Image
                    src={nextCourse?.coverImage || "/placeholder.svg?height=300&width=400"}
                    alt={nextCourse?.title || "e-somo Training"}
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[#004D40] font-bold">
                      {nextCourse?.title || "Next Cohort Starting"}
                    </div>
                    <div className="bg-[#004D40]/10 text-[#004D40] px-2 py-1 rounded text-sm font-medium">
                      {nextCourse?.startDate
                        ? new Date(nextCourse.startDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "TBA"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{nextCourse?.location || "Online"}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-sm text-gray-500">Level</div>
                      <div className="font-medium">{nextCourse?.level || "All Levels"}</div>
                    </div>
                  </div>
                  <Link
                    href={nextCourse ? `#courses` : "#"}
                    className="block text-center w-full py-3 bg-[#004D40] text-white font-medium rounded-lg hover:bg-[#00695C] transition duration-300"
                  >
                    {nextCourse ? "Apply for " + nextCourse.title : "Apply Now"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12 border-b">
          <div className="container px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#004D40] mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div id="courses" className="container px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-block bg-[#004D40]/10 text-[#004D40] px-3 py-1 text-sm font-medium rounded-full mb-4">
                Our Programs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Explore our industry-relevant courses designed to help you master in-demand skills and advance your
                career.
              </p>
            </div>
            <Link
              href="/all-courses"
              className="mt-6 md:mt-0 text-[#004D40] font-medium hover:text-[#00695C] flex items-center"
            >
              View All Courses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading courses...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300"
                >
                  <div className="relative">
                    <Image
                      src={course.coverImage || "/placeholder.svg?height=240&width=500"}
                      alt={course.title}
                      width={500}
                      height={240}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-sm font-medium rounded-full text-[#004D40]">
                      {course.level}
                    </div>
                    <div className="absolute top-4 right-4 bg-[#004D40] px-3 py-1 text-sm font-medium rounded-full text-white">
                      {course.startDate}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                    <p className="text-gray-600 mb-6">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <Link
                        className="px-5 py-2.5 rounded-lg bg-[#004D40] hover:bg-[#00695C] text-white font-medium transition duration-300"
                        href={`./e-somo/form/${course.id}`}
                      >
                        Enroll Now
                      </Link>
                      <Link
                        href={`./e-somo/course/${course.id}`}
                        className="text-[#004D40] font-medium hover:text-[#00695C] flex items-center"
                      >
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 py-20">
          <div className="container px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-[#004D40]/10 text-[#004D40] px-3 py-1 text-sm font-medium rounded-full mb-4">
                Why e-somo
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Program</h2>
              <p className="text-lg text-gray-600">
                e-somo offers a unique learning experience that combines theoretical knowledge with practical skills,
                preparing you for real-world challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-[#004D40]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#004D40]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry-Relevant Curriculum</h3>
                <p className="text-gray-600">
                  Our courses are designed in collaboration with industry experts to ensure you learn the most in-demand
                  skills.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-[#004D40]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#004D40]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-on Learning</h3>
                <p className="text-gray-600">
                  Learn by doing with project-based assignments that simulate real-world scenarios and challenges.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-[#004D40]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#004D40]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from experienced professionals who bring real-world expertise and insights to the classroom.
                </p>
              </div>
            </div>
          </div>
        </div>

       

        {/* Blog Section */}
        <div className="bg-gray-50 py-20">
          <div className="container px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-block bg-[#004D40]/10 text-[#004D40] px-3 py-1 text-sm font-medium rounded-full mb-4">
                  Our Blog
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Stay updated with the latest trends, insights, and news from the world of technology and education.
                </p>
              </div>
              <Link
                href="/blog"
                className="mt-6 md:mt-0 text-[#004D40] font-medium hover:text-[#00695C] flex items-center"
              >
                View All Articles
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5">
                      <Image
                        src={blog.image || "/placeholder.svg?height=300&width=300"}
                        alt={blog.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{blog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#004D40]/20 flex items-center justify-center text-[#004D40] font-bold mr-2">
                            {blog.author?.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700">{blog.author}</span>
                        </div>
                        <Link href={`/blog/${blog.id}`} className="text-[#004D40] font-medium hover:text-[#00695C]">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#004D40] text-white py-20">
          <div className="container px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with e-somo. Enroll in a course today and
                take the first step towards your future.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="#courses"
                  className="px-8 py-3 bg-white text-[#004D40] font-medium rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div id="contact" className="container px-8 py-20">
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-[#004D40]/10 text-[#004D40] px-3 py-1 text-sm font-medium rounded-full mb-4">
                  Stay Updated
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-6">
                  Get the latest updates on new courses, events, and special offers delivered straight to your inbox.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004D40] focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-[#004D40] text-white font-medium rounded-lg hover:bg-[#00695C] transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from e-somo.
                </p>
              </div>
              <div className="hidden md:block">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Newsletter"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
