import { getTaskTypes } from "@/lib/actions/task-types"
import { TaskTypesClient } from "./task-types-client"

export default async function TaskTypesPage() {
  const taskTypes = await getTaskTypes()

  return <TaskTypesClient initialTaskTypes={taskTypes} />
}
