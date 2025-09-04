"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getTaskTypes() {
  const supabase = await createClient()

  const { data: taskTypes, error } = await supabase.from("task_types").select("*").order("name")

  if (error) {
    console.error("Error fetching task types:", error)
    return []
  }

  return taskTypes || []
}

export async function createTaskType(formData: any) {
  const supabase = await createClient()

  const { error } = await supabase.from("task_types").insert(formData)

  if (error) {
    console.error("Error creating task type:", error)
    throw new Error("Failed to create task type")
  }

  revalidatePath("/task-types")
}

export async function updateTaskType(taskTypeId: string, formData: any) {
  const supabase = await createClient()

  const { error } = await supabase.from("task_types").update(formData).eq("id", taskTypeId)

  if (error) {
    console.error("Error updating task type:", error)
    throw new Error("Failed to update task type")
  }

  revalidatePath("/task-types")
}

export async function deleteTaskType(taskTypeId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("task_types").delete().eq("id", taskTypeId)

  if (error) {
    console.error("Error deleting task type:", error)
    throw new Error("Failed to delete task type")
  }

  revalidatePath("/task-types")
}
