import type React from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"

export default function TaskTypesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">{children}</div>
    </div>
  )
}
