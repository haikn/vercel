"use server"

import { createClient } from "@/lib/supabase/server"

export async function debugUsers() {
  const supabase = createClient()

  // Check what users exist
  const { data: users, error } = await supabase.from("users").select("*")

  console.log("[v0] Users in database:", users)
  console.log("[v0] Error:", error)

  return { users, error }
}

export async function testPasswordVerification() {
  const supabase = createClient()

  // Test the verify_password function directly
  const { data, error } = await supabase.rpc("verify_password", {
    stored_hash: "$2b$10$example", // This will fail but shows if function exists
    password_input: "test",
  })

  console.log("[v0] Password verification test:", data, error)

  return { data, error }
}
