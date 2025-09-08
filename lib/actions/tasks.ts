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
  try {
    console.log("[v0] Creating task with data:", formData)

    const user = await getCurrentUser()
    if (!user) {
      console.log("[v0] No user found, redirecting")
      redirect("/")
    }

    console.log("[v0] User found:", user.id)

    const supabase = await createServerClient()

    const taskData = {
      ...formData,
      user_id: user.id,
      task_type_id: formData.task_type_id === "" ? null : formData.task_type_id,
    }

    console.log("[v0] Inserting task data:", taskData)

    const { data, error } = await supabase.from("tasks").insert(taskData).select()

    if (error) {
      console.error("[v0] Database error creating task:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Task created successfully:", data)
    revalidatePath("/tasks")
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Unexpected error creating task:", error)
    return { success: false, error: "Failed to create task" }
  }
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
