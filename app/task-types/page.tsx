import { getTaskTypes } from "@/lib/actions/task-types"
import { getCurrentUser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"
import { TaskTypesClient } from "./task-types-client"

export default async function TaskTypesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const taskTypes = await getTaskTypes()

  return <TaskTypesClient initialTaskTypes={taskTypes} />
}
