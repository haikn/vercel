"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"

interface DashboardBlockProps {
  id: string
  title: string
  content: string
  columnId: string
  onDragStart: (blockId: string, sourceColumnId: string) => void
  onEdit: (blockId: string) => void
  onDelete: (blockId: string) => void
}

export function DashboardBlock({ id, title, content, columnId, onDragStart, onEdit, onDelete }: DashboardBlockProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", id)
    e.dataTransfer.effectAllowed = "move"
    setIsDragging(true)
    onDragStart(id, columnId)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <Card
      className={`mb-4 cursor-move hover:shadow-md transition-all select-none overflow-hidden ${
        isDragging ? "opacity-50 rotate-2 scale-105" : ""
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-black text-white">
        <CardTitle className="text-sm font-bold text-white">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-gray-800">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(id)} className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(id)} className="cursor-pointer text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="bg-[#f9d022] text-white">
        <p className="text-sm font-normal text-white">{content}</p>
      </CardContent>
    </Card>
  )
}
