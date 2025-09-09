"use client"

import { Dashboard } from "@/components/dashboard"
import { getLatestTasks, getTaskStats } from "@/lib/actions/dashboard"
import { getCurrentUser } from "@/lib/actions/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const [latestTasks, setLatestTasks] = useState([])
  const [taskStats, setTaskStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        // Check authentication first
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/")
          return
        }
        setUser(currentUser)

        // Load dashboard data
        const [tasks, stats] = await Promise.all([getLatestTasks(5), getTaskStats()])
        setLatestTasks(tasks)
        setTaskStats(stats)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Overview of your latest tasks and activities</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
        </div>
      ) : (
        <Dashboard latestTasks={latestTasks} taskStats={taskStats} />
      )}
    </div>
  )
}
