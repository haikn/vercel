"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskFormProps {
  onSubmit: (task: any) => void
  onCancel: () => void
  initialData?: any
  taskTypes: any[]
  isLoading?: boolean
}

export function TaskForm({ onSubmit, onCancel, initialData, taskTypes, isLoading }: TaskFormProps) {
  const [formData, setFormData] = useState({
    task_name: initialData?.task_name || "",
    task_description: initialData?.task_description || "",
    start_date_time: initialData?.start_date_time
      ? new Date(initialData.start_date_time).toISOString().slice(0, 16)
      : "",
    end_date_time: initialData?.end_date_time ? new Date(initialData.end_date_time).toISOString().slice(0, 16) : "",
    note: initialData?.note || "",
    task_type_id: initialData?.task_type_id || initialData?.task_types?.id || "",
    status: initialData?.status || "pending",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="bg-black text-white p-6">
        <CardTitle className="text-white font-bold">{initialData ? "Edit Task" : "Create New Task"}</CardTitle>
      </CardHeader>
      <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="task_name" className="text-white font-medium">
              Task Name
            </Label>
            <Input
              id="task_name"
              value={formData.task_name}
              onChange={(e) => setFormData({ ...formData, task_name: e.target.value })}
              required
              className="bg-white text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="task_description" className="text-white font-medium">
              Description
            </Label>
            <Textarea
              id="task_description"
              value={formData.task_description}
              onChange={(e) => setFormData({ ...formData, task_description: e.target.value })}
              className="bg-white text-black"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date_time" className="text-white font-medium">
                Start Date & Time
              </Label>
              <Input
                id="start_date_time"
                type="datetime-local"
                value={formData.start_date_time}
                onChange={(e) => setFormData({ ...formData, start_date_time: e.target.value })}
                className="bg-white text-black"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="end_date_time" className="text-white font-medium">
                End Date & Time
              </Label>
              <Input
                id="end_date_time"
                type="datetime-local"
                value={formData.end_date_time}
                onChange={(e) => setFormData({ ...formData, end_date_time: e.target.value })}
                className="bg-white text-black"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task_type" className="text-white font-medium">
                Task Type
              </Label>
              <Select
                value={formData.task_type_id}
                onValueChange={(value) => setFormData({ ...formData, task_type_id: value })}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="text-white font-medium">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="note" className="text-white font-medium">
              Note
            </Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="bg-white text-black"
              rows={2}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-black text-white hover:bg-gray-800" disabled={isLoading}>
              {isLoading ? "Saving..." : initialData ? "Update Task" : "Create Task"}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="bg-white text-black border-black hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
