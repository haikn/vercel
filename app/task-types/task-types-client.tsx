"use client"

import { useState, useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskTypeForm } from "@/components/task-type-form"
import { Plus, Edit, Trash2 } from "lucide-react"
import { createTaskType, updateTaskType, deleteTaskType, getTaskTypes } from "@/lib/actions/task-types"

interface TaskTypesClientProps {
  initialTaskTypes: any[]
}

export function TaskTypesClient({ initialTaskTypes }: TaskTypesClientProps) {
  const [taskTypes, setTaskTypes] = useState(initialTaskTypes)
  const [showForm, setShowForm] = useState(false)
  const [editingTaskType, setEditingTaskType] = useState(null)
  const [isPending, startTransition] = useTransition()

  const refreshTaskTypes = async () => {
    try {
      const updatedTaskTypes = await getTaskTypes()
      setTaskTypes(updatedTaskTypes)
    } catch (error) {
      console.error("Failed to refresh task types:", error)
    }
  }

  const handleCreateTaskType = async (taskTypeData: any) => {
    startTransition(async () => {
      try {
        await createTaskType(taskTypeData)
        setShowForm(false)
        await refreshTaskTypes()
      } catch (error) {
        console.error("Failed to create task type:", error)
        alert("Failed to create task type. Please try again.")
      }
    })
  }

  const handleEditTaskType = async (taskTypeData: any) => {
    if (!editingTaskType) return

    startTransition(async () => {
      try {
        await updateTaskType(editingTaskType.id, taskTypeData)
        setEditingTaskType(null)
        setShowForm(false)
        await refreshTaskTypes()
      } catch (error) {
        console.error("Failed to update task type:", error)
        alert("Failed to update task type. Please try again.")
      }
    })
  }

  const handleDeleteTaskType = async (taskTypeId: string) => {
    if (!confirm("Are you sure you want to delete this task type?")) return

    startTransition(async () => {
      try {
        await deleteTaskType(taskTypeId)
        await refreshTaskTypes()
      } catch (error) {
        console.error("Failed to delete task type:", error)
        alert("Failed to delete task type. Please try again.")
      }
    })
  }

  useEffect(() => {
    refreshTaskTypes()
  }, [])

  if (showForm) {
    return (
      <div className="p-6">
        <TaskTypeForm
          onSubmit={editingTaskType ? handleEditTaskType : handleCreateTaskType}
          onCancel={() => {
            setShowForm(false)
            setEditingTaskType(null)
          }}
          initialData={editingTaskType}
          isLoading={isPending}
        />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Types List</h1>
          <p className="text-muted-foreground">Manage task categories and types</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-black text-white hover:bg-gray-800"
          disabled={isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task Type
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {taskTypes.map((taskType) => (
          <Card key={taskType.id} className="p-0 gap-0">
            <CardHeader className="bg-black text-white p-4">
              <CardTitle className="text-white font-bold flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: taskType.color }} />
                {taskType.name}
              </CardTitle>
            </CardHeader>
            <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-4">
              <p className="text-white mb-4">{taskType.description}</p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingTaskType(taskType)
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
                  onClick={() => handleDeleteTaskType(taskType.id)}
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

        {taskTypes.length === 0 && (
          <Card className="p-0 gap-0 md:col-span-2 lg:col-span-3">
            <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-8 text-center">
              <p className="text-white">No task types found. Create your first task type to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
