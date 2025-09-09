"use client"

import { getTasks } from "@/lib/actions/tasks"
import { getTaskTypes } from "@/lib/actions/task-types"
import { getCurrentUser } from "@/lib/actions/auth"
import { TasksClient } from "./tasks-client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [taskTypes, setTaskTypes] = useState([])
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

        // Load tasks data
        const [tasksData, taskTypesData] = await Promise.all([getTasks(), getTaskTypes()])
        setTasks(tasksData)
        setTaskTypes(taskTypesData)
      } catch (error) {
        console.error("Error loading tasks data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and track progress</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading tasks...</span>
        </div>
      </div>
    )
  }

  return <TasksClient initialTasks={tasks} taskTypes={taskTypes} />
}
