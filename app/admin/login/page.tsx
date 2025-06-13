"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import Cookies from 'js-cookie'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { token, user } = response.data;
      
      Cookies.set('token', token);
      Cookies.set('userEmail', user.email);
      
      router.push("/admin/dashboard");
    } catch (error: any) { 
      console.error("Error during login:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#004D40] opacity-90"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.05' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A017]/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-[#004D40]">
              <span className="text-[#D4A017]">CLÉ-BUT</span> EXPERTS
            </span>
          </Link>
          <div className="w-20 h-1 bg-[#D4A017] mx-auto my-4"></div>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Sign in to access the admin panel</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-center"
          >
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <span className="text-red-700 font-bold">!</span>
            </div>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="admin@clebut.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#004D40] focus:ring-[#004D40] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#004D40] hover:text-[#00695C]">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#004D40] hover:bg-[#00695C] text-white" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Back to{" "}
            <Link href="/" className="font-medium text-[#004D40] hover:text-[#00695C]">
              Homepage
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  )
}
