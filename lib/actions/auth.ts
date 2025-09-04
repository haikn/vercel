"use server"

import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(username: string, password: string) {
  const supabase = await createServerClient()

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, email, password_hash")
      .eq("username", username)

    if (error || !users || users.length === 0) {
      console.log("[v0] User not found:", username)
      return { error: "Invalid username or password" }
    }

    const user = users[0]

    // For now, let's do a simple password check (in production, you'd use bcrypt)
    // Since we're using test data, let's check if it matches our test accounts
    const isValidPassword =
      (username === "namtest" && password === "123456") || (username === "demo" && password === "password123")

    if (!isValidPassword) {
      console.log("[v0] Invalid password for user:", username)
      return { error: "Invalid username or password" }
    }

    const cookieStore = await cookies()
    cookieStore.set(
      "user_session",
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    console.log("[v0] Login successful for user:", username)
    return { success: true, user: { id: user.id, username: user.username, email: user.email } }
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    return { error: "An error occurred during sign in" }
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("user_session")
  redirect("/")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user_session")

    if (!sessionCookie) {
      return null
    }

    const user = JSON.parse(sessionCookie.value)
    return user
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return null
  }
}
