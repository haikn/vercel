"use server"

import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(username: string, password: string) {
  const supabase = await createServerClient()

  try {
    console.log("[v0] Attempting login for username:", username)
    console.log("[v0] Password length:", password.length)

    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, email, password_hash")
      .eq("username", username)

    console.log("[v0] Database query result:", { users, error })

    if (error || !users || users.length === 0) {
      console.log("[v0] User not found:", username)
      return { error: "Invalid username or password" }
    }

    const user = users[0]
    console.log("[v0] Found user:", { id: user.id, username: user.username, email: user.email })
    console.log("[v0] Password hash from DB:", user.password_hash)

    console.log("[v0] About to call verify_password RPC with:", {
      input_password: password,
      stored_hash: user.password_hash,
    })

    const { data: passwordResult, error: passwordError } = await supabase.rpc("verify_password", {
      input_password: password,
      stored_hash: user.password_hash,
    })

    console.log("[v0] RPC call completed")
    console.log("[v0] Password verification result:", passwordResult)
    console.log("[v0] Password verification error:", passwordError)
    console.log("[v0] Type of passwordResult:", typeof passwordResult)

    const { data: testRpc, error: testRpcError } = await supabase.rpc("verify_password", {
      input_password: "test",
      stored_hash: "$2a$06$test",
    })
    console.log("[v0] Test RPC call result:", { testRpc, testRpcError })

    if (passwordError) {
      console.log("[v0] Password verification failed with error:", passwordError)
      return { error: "Invalid username or password" }
    }

    if (!passwordResult) {
      console.log("[v0] Password verification returned false")
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
