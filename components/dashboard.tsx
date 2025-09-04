"use client"

import { useState } from "react"
import { DashboardColumn } from "./dashboard-column"

interface Block {
  id: string
  title: string
  content: string
}

interface Column {
  id: string
  title: string
  blocks: Block[]
}

const initialData: Column[] = [
  {
    id: "column-1",
    title: "To Do",
    blocks: [
      {
        id: "block-1",
        title: "Project Planning",
        content: "Define project scope and requirements for the new dashboard feature.",
      },
      {
        id: "block-2",
        title: "Design Review",
        content: "Review and approve the latest design mockups from the design team.",
      },
      {
        id: "block-3",
        title: "Database Schema",
        content: "Create database schema for user management and block storage.",
      },
    ],
  },
  {
    id: "column-2",
    title: "In Progress",
    blocks: [
      {
        id: "block-4",
        title: "API Development",
        content: "Implement REST API endpoints for block management operations.",
      },
      {
        id: "block-5",
        title: "Frontend Components",
        content: "Build reusable React components for the dashboard interface.",
      },
      {
        id: "block-6",
        title: "Authentication",
        content: "Integrate user authentication and authorization system.",
      },
    ],
  },
  {
    id: "column-3",
    title: "Done",
    blocks: [
      {
        id: "block-7",
        title: "Environment Setup",
        content: "Configure development environment and project dependencies.",
      },
      {
        id: "block-8",
        title: "Initial Wireframes",
        content: "Create low-fidelity wireframes for dashboard layout and flow.",
      },
      {
        id: "block-9",
        title: "Color Palette",
        content: "Define brand colors and design system tokens for consistency.",
      },
    ],
  },
]

export function Dashboard() {
  const [columns, setColumns] = useState<Column[]>(initialData)
  const [draggedBlock, setDraggedBlock] = useState<{ blockId: string; sourceColumnId: string } | null>(null)

  const handleDragStart = (blockId: string, sourceColumnId: string) => {
    setDraggedBlock({ blockId, sourceColumnId })
  }

  const handleDrop = (blockId: string, targetColumnId: string) => {
    if (!draggedBlock || draggedBlock.sourceColumnId === targetColumnId) {
      setDraggedBlock(null)
      return
    }

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns]
      const sourceColumnIndex = newColumns.findIndex((col) => col.id === draggedBlock.sourceColumnId)
      const targetColumnIndex = newColumns.findIndex((col) => col.id === targetColumnId)

      if (sourceColumnIndex === -1 || targetColumnIndex === -1) return prevColumns

      const sourceColumn = newColumns[sourceColumnIndex]
      const blockIndex = sourceColumn.blocks.findIndex((block) => block.id === blockId)

      if (blockIndex === -1) return prevColumns

      const [movedBlock] = sourceColumn.blocks.splice(blockIndex, 1)
      const targetColumn = newColumns[targetColumnIndex]
      targetColumn.blocks.push(movedBlock)

      return newColumns
    })

    setDraggedBlock(null)
  }

  const handleAddBlock = (columnId: string, title: string, content: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
    }

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, blocks: [...column.blocks, newBlock] } : column,
      ),
    )
  }

  const handleEditBlock = (blockId: string, title: string, content: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        blocks: column.blocks.map((block) => (block.id === blockId ? { ...block, title, content } : block)),
      })),
    )
  }

  const handleDeleteBlock = (blockId: string) => {
    if (confirm("Are you sure you want to delete this block?")) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          blocks: column.blocks.filter((block) => block.id !== blockId),
        })),
      )
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <DashboardColumn
            key={column.id}
            id={column.id}
            title={column.title}
            blocks={column.blocks}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onAddBlock={handleAddBlock}
            onEditBlock={handleEditBlock}
            onDeleteBlock={handleDeleteBlock}
          />
        ))}
      </div>
    </div>
  )
}
