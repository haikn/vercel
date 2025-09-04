"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskTypeFormProps {
  onSubmit: (taskType: any) => void
  onCancel: () => void
  initialData?: any
  isLoading?: boolean
}

export function TaskTypeForm({ onSubmit, onCancel, initialData, isLoading }: TaskTypeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    color: initialData?.color || "#f9d022",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="bg-black text-white p-6">
        <CardTitle className="text-white font-bold">
          {initialData ? "Edit Task Type" : "Create New Task Type"}
        </CardTitle>
      </CardHeader>
      <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white text-black"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white text-black"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="color" className="text-white font-medium">
              Color
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-16 h-10 bg-white"
                disabled={isLoading}
              />
              <Input
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="bg-white text-black"
                placeholder="#f9d022"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-black text-white hover:bg-gray-800" disabled={isLoading}>
              {isLoading ? "Saving..." : initialData ? "Update Task Type" : "Create Task Type"}
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
