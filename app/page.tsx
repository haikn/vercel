"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const router = useRouter()

  const handleLogin = (email: string, password: string) => {
    // Simple authentication - in real app, this would validate against a backend
    if (email && password) {
      setUser({ email })
      setIsLoggedIn(true)
      router.push("/dashboard")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
            <p className="text-muted-foreground">Choose an option from the sidebar to get started.</p>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <p className="text-muted-foreground">
              Use the sidebar navigation to access your dashboard, manage tasks, or configure task types.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
