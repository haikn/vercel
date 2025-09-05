"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, CheckSquare, Tag, LogOut } from "lucide-react"
import { signOut } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks List",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Task Types List",
    href: "/task-types",
    icon: Tag,
  },
]

interface SidebarNavigationProps {
  user: { username: string; email: string } | null
}

export function SidebarNavigation({ user }: SidebarNavigationProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="w-64 bg-black text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Task Manager</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive ? "bg-[#f9d022] text-black font-medium" : "text-white hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-[#f9d022] rounded-full flex items-center justify-center">
            <span className="text-black font-medium text-sm">{user?.username?.charAt(0).toUpperCase() || "U"}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{user?.username || "User"}</p>
            <p className="text-xs text-gray-400">{user?.email || "user@example.com"}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-white hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
