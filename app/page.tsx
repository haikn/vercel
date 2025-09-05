import { getCurrentUser } from "@/lib/actions/auth"
import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  if (user) {
    console.log("[v0] User already logged in, redirecting to dashboard")
    redirect("/dashboard")
  }

  return <LoginForm />
}
