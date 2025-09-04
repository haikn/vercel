"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface AddBlockFormProps {
  onAdd: (title: string, content: string) => void
  onCancel: () => void
}

export function AddBlockForm({ onAdd, onCancel }: AddBlockFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onAdd(title.trim(), content.trim())
      setTitle("")
      setContent("")
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Add New Block</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-xs">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter block title"
              className="h-8"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="content" className="text-xs">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter block content"
              className="min-h-[60px] resize-none"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" className="flex-1">
              Add Block
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
