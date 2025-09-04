"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(username: string, password: string) {
  const supabase = await createServerClient()

  try {
    // First, find the user by username and verify password
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, username, email")
      .eq("username", username)
      .single()

    if (userError || !user) {
      return { error: "Invalid username or password" }
    }

    // Verify password using pgcrypto
    const { data: passwordCheck, error: passwordError } = await supabase.rpc("verify_password", {
      username_input: username,
      password_input: password,
    })

    if (passwordError || !passwordCheck) {
      return { error: "Invalid username or password" }
    }

    // Create a Supabase auth session using the user's email
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: "temp_password_" + user.id, // We'll use a temporary password system
    })

    if (authError) {
      // If auth user doesn't exist, create one
      const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: "temp_password_" + user.id,
        user_metadata: {
          username: user.username,
          user_id: user.id,
        },
      })

      if (signUpError) {
        return { error: "Authentication failed" }
      }

      // Now sign in with the created user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: "temp_password_" + user.id,
      })

      if (signInError) {
        return { error: "Authentication failed" }
      }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Sign in error:", error)
    return { error: "An error occurred during sign in" }
  }
}

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function getCurrentUser() {
  const supabase = await createServerClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    return null
  }

  // Get user details from our users table
  const { data: user } = await supabase.from("users").select("id, username, email").eq("email", authUser.email).single()

  return user
}
