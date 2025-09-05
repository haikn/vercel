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
      return { error: "Invalid username or password" }
    }

    const user = users[0]

    const { data: passwordResult, error: passwordError } = await supabase.rpc("verify_password", {
      input_password: password,
      stored_hash: user.password_hash,
    })

    if (passwordError || !passwordResult) {
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

    console.log("[v0] getCurrentUser called")
    console.log("[v0] Session cookie exists:", !!sessionCookie)

    if (!sessionCookie) {
      console.log("[v0] No session cookie found")
      return null
    }

    const user = JSON.parse(sessionCookie.value)
    console.log("[v0] Valid user session found for:", user.username)
    return user
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    const cookieStore = await cookies()
    cookieStore.delete("user_session")
    return null
  }
}
