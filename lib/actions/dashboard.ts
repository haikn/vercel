"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export async function getLatestTasks(limit = 10) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }

  const supabase = await createClient()

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select(`
      *,
      task_types (
        id,
        name,
        color
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching latest tasks:", error)
    return []
  }

  return tasks || []
}

export async function getTaskStats() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }

  const supabase = await createClient()

  const [totalTasks, pendingTasks, inProgressTasks, completedTasks] = await Promise.all([
    supabase.from("tasks").select("id", { count: "exact" }).eq("user_id", user.id),
    supabase.from("tasks").select("id", { count: "exact" }).eq("user_id", user.id).eq("status", "pending"),
    supabase.from("tasks").select("id", { count: "exact" }).eq("user_id", user.id).eq("status", "in_progress"),
    supabase.from("tasks").select("id", { count: "exact" }).eq("user_id", user.id).eq("status", "completed"),
  ])

  return {
    total: totalTasks.count || 0,
    pending: pendingTasks.count || 0,
    inProgress: inProgressTasks.count || 0,
    completed: completedTasks.count || 0,
  }
}
