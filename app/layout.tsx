import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "CLÉ-BUT EXPERTS | Empower • Connect • Transform",
  description:
    "CLÉ-BUT EXPERTS provides customized IT solutions, software development, training, and consulting services to enhance efficiency and foster growth.",
    icons: {
      icon: [{ url: "/images/logo-2.png" }, { url: "/images/logo-2.png" }],
      apple: [{ url: "/images/logo-2.png" }],
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
