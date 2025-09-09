"use client"

import { getTaskTypes } from "@/lib/actions/task-types"
import { getCurrentUser } from "@/lib/actions/auth"
import { TaskTypesClient } from "./task-types-client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function TaskTypesPage() {
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

        // Load task types data
        const taskTypesData = await getTaskTypes()
        setTaskTypes(taskTypesData)
      } catch (error) {
        console.error("Error loading task types data:", error)
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
          <h1 className="text-3xl font-bold text-foreground">Task Types</h1>
          <p className="text-muted-foreground">Manage your task categories and types</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading task types...</span>
        </div>
      </div>
    )
  }

  return <TaskTypesClient initialTaskTypes={taskTypes} />
}
