import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
    const res = await axios.get(apiUrl)
    return NextResponse.json(res.data)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.title || !body.description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 })
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
    const res = await axios.post(apiUrl, body)
    return NextResponse.json(res.data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to create course" }, { status: 500 })
  }
}