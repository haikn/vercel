"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentUser } from "./auth"

export async function getTasks() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }

  const supabase = await createServerClient()

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

  if (error) {
    console.error("Error fetching tasks:", error)
    return []
  }

  return tasks || []
}

export async function createTask(formData: any) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }

  const supabase = await createServerClient()

  const { error } = await supabase.from("tasks").insert({
    ...formData,
    user_id: user.id,
  })

  if (error) {
    console.error("Error creating task:", error)
    throw new Error("Failed to create task")
  }

  revalidatePath("/tasks")
}

export async function updateTask(taskId: string, formData: any) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }

  const supabase = await createServerClient()

  const { error } = await supabase.from("tasks").update(formData).eq("id", taskId).eq("user_id", user.id)

  if (error) {
    console.error("Error updating task:", error)
    throw new Error("Failed to update task")
  }

  revalidatePath("/tasks")
}

export async function deleteTask(taskId: string) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }

  const supabase = await createServerClient()

  const { error } = await supabase.from("tasks").delete().eq("id", taskId).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting task:", error)
    throw new Error("Failed to delete task")
  }

  revalidatePath("/tasks")
}
