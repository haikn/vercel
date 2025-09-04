import { getTasks } from "@/lib/actions/tasks"
import { getTaskTypes } from "@/lib/actions/task-types"
import { TasksClient } from "./tasks-client"

export default async function TasksPage() {
  const [tasks, taskTypes] = await Promise.all([getTasks(), getTaskTypes()])

  return <TasksClient initialTasks={tasks} taskTypes={taskTypes} />
}
