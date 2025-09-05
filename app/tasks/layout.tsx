import type React from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { getCurrentUser } from "@/lib/actions/auth"

export default async function TasksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation user={user} />
      <div className="flex-1">{children}</div>
    </div>
  )
}
