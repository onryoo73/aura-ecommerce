import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function GET() {
  const { data: users, error } = await supabase
    .from("users")
    .select("id, email, is_admin, password IS NOT NULL as has_password")
  
  return NextResponse.json({ users, error, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) + "..." })
}

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error) {
    return NextResponse.json({ error: "Supabase query failed", details: error.message })
  }

  if (!user) return NextResponse.json({ error: "User not found" })

  const passwordMatch = await bcrypt.compare(password, user.password)

  return NextResponse.json({
    userFound: true,
    passwordMatch,
    hasPasswordField: !!user.password,
    userEmail: user.email,
    isAdmin: user.isAdmin,
  })
}
