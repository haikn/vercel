import { getTasks } from "@/lib/actions/tasks"
import { getTaskTypes } from "@/lib/actions/task-types"
import { getCurrentUser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"
import { TasksClient } from "./tasks-client"

export default async function TasksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const [tasks, taskTypes] = await Promise.all([getTasks(), getTaskTypes()])

  return <TasksClient initialTasks={tasks} taskTypes={taskTypes} />
}
