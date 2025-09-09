"use client"

import { useState, useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskForm } from "@/components/task-form"
import { Plus, Edit, Trash2 } from "lucide-react"
import { createTask, updateTask, deleteTask, getTasks } from "@/lib/actions/tasks"

interface TasksClientProps {
  initialTasks: any[]
  taskTypes: any[]
}

export function TasksClient({ initialTasks, taskTypes }: TasksClientProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isPending, startTransition] = useTransition()

  const refreshTasks = async () => {
    try {
      const updatedTasks = await getTasks()
      setTasks(updatedTasks)
    } catch (error) {
      console.error("Failed to refresh tasks:", error)
    }
  }

  const handleCreateTask = async (taskData: any) => {
    startTransition(async () => {
      try {
        await createTask(taskData)
        setShowForm(false)
        await refreshTasks()
      } catch (error) {
        console.error("Failed to create task:", error)
        alert("Failed to create task. Please try again.")
      }
    })
  }

  const handleEditTask = async (taskData: any) => {
    if (!editingTask) return

    startTransition(async () => {
      try {
        await updateTask(editingTask.id, taskData)
        setEditingTask(null)
        setShowForm(false)
        await refreshTasks()
      } catch (error) {
        console.error("Failed to update task:", error)
        alert("Failed to update task. Please try again.")
      }
    })
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    startTransition(async () => {
      try {
        await deleteTask(taskId)
        await refreshTasks()
      } catch (error) {
        console.error("Failed to delete task:", error)
        alert("Failed to delete task. Please try again.")
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    refreshTasks()
  }, [])

  if (showForm) {
    return (
      <div className="p-6">
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
          initialData={editingTask}
          taskTypes={taskTypes}
          isLoading={isPending}
        />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks List</h1>
          <p className="text-muted-foreground">Manage all your tasks</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-black text-white hover:bg-gray-800"
          disabled={isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-0 gap-0">
            <CardHeader className="bg-black text-white p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-bold">{task.task_name}</CardTitle>
                <div className="flex items-center gap-2">
                  {task.task_types && (
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: task.task_types.color, color: "white" }}
                    >
                      {task.task_types.name}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-4">
              <p className="text-white mb-3">{task.task_description}</p>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="font-medium">Start:</span>{" "}
                  {task.start_date_time ? new Date(task.start_date_time).toLocaleString() : "Not set"}
                </div>
                <div>
                  <span className="font-medium">End:</span>{" "}
                  {task.end_date_time ? new Date(task.end_date_time).toLocaleString() : "Not set"}
                </div>
              </div>

              {task.note && (
                <div className="mb-3">
                  <span className="font-medium">Note:</span> {task.note}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingTask(task)
                    setShowForm(true)
                  }}
                  className="bg-white text-black hover:bg-gray-100"
                  disabled={isPending}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={isPending}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <Card className="p-0 gap-0">
            <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-8 text-center">
              <p className="text-white">No tasks found. Create your first task to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
