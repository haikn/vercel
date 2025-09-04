"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getTasks() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/")
  }

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
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/")
  }

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
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/")
  }

  const { error } = await supabase.from("tasks").update(formData).eq("id", taskId).eq("user_id", user.id)

  if (error) {
    console.error("Error updating task:", error)
    throw new Error("Failed to update task")
  }

  revalidatePath("/tasks")
}

export async function deleteTask(taskId: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/")
  }

  const { error } = await supabase.from("tasks").delete().eq("id", taskId).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting task:", error)
    throw new Error("Failed to delete task")
  }

  revalidatePath("/tasks")
}
