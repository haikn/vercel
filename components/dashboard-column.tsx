"use client"

import type React from "react"

import { useState } from "react"
import { DashboardBlock } from "./dashboard-block"
import { AddBlockForm } from "./add-block-form"
import { EditBlockForm } from "./edit-block-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Block {
  id: string
  title: string
  content: string
}

interface DashboardColumnProps {
  id: string
  title: string
  blocks: Block[]
  onDragStart: (blockId: string, sourceColumnId: string) => void
  onDrop: (blockId: string, targetColumnId: string) => void
  onAddBlock: (columnId: string, title: string, content: string) => void
  onEditBlock: (blockId: string, title: string, content: string) => void
  onDeleteBlock: (blockId: string) => void
}

export function DashboardColumn({
  id,
  title,
  blocks,
  onDragStart,
  onDrop,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
}: DashboardColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const blockId = e.dataTransfer.getData("text/plain")
    onDrop(blockId, id)
  }

  const handleAddBlock = (title: string, content: string) => {
    onAddBlock(id, title, content)
    setShowAddForm(false)
  }

  const handleEditBlock = (blockId: string, title: string, content: string) => {
    onEditBlock(blockId, title, content)
    setEditingBlockId(null)
  }

  const editingBlock = blocks.find((block) => block.id === editingBlockId)

  return (
    <div
      className={`bg-muted/30 rounded-lg p-4 min-h-[600px] transition-colors ${
        isDragOver ? "bg-accent/20 border-2 border-accent border-dashed" : ""
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAddForm(true)}
          className="h-8 w-8 p-0"
          disabled={showAddForm}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {showAddForm && <AddBlockForm onAdd={handleAddBlock} onCancel={() => setShowAddForm(false)} />}

        {blocks.map((block) => {
          if (editingBlockId === block.id && editingBlock) {
            return (
              <EditBlockForm
                key={block.id}
                id={block.id}
                initialTitle={editingBlock.title}
                initialContent={editingBlock.content}
                onSave={handleEditBlock}
                onCancel={() => setEditingBlockId(null)}
              />
            )
          }

          return (
            <DashboardBlock
              key={block.id}
              id={block.id}
              title={block.title}
              content={block.content}
              columnId={id}
              onDragStart={onDragStart}
              onEdit={(blockId) => setEditingBlockId(blockId)}
              onDelete={onDeleteBlock}
            />
          )
        })}

        {blocks.length === 0 && !showAddForm && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">Drop blocks here or click + to add new blocks</p>
          </div>
        )}
      </div>
    </div>
  )
}
