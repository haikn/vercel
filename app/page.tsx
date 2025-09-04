import { getCurrentUser } from "@/lib/actions/auth"
import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return <LoginForm />
}
