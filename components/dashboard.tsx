import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Clock, Play, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  task_name: string
  task_description: string
  status: string
  created_at: string
  start_date_time?: string
  end_date_time?: string
  task_types?: {
    id: string
    name: string
    color: string
  }
}

interface TaskStats {
  total: number
  pending: number
  inProgress: number
  completed: number
}

interface DashboardProps {
  latestTasks: Task[]
  taskStats: TaskStats
}

export function Dashboard({ latestTasks, taskStats }: DashboardProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Play className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0 gap-0">
          <CardHeader className="bg-black text-white p-4">
            <CardTitle className="text-white font-bold flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-4">
            <div className="text-2xl font-bold text-white">{taskStats.total}</div>
          </CardContent>
        </Card>

        <Card className="p-0 gap-0">
          <CardHeader className="bg-black text-white p-4">
            <CardTitle className="text-white font-bold flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-4">
            <div className="text-2xl font-bold text-white">{taskStats.pending}</div>
          </CardContent>
        </Card>

        <Card className="p-0 gap-0">
          <CardHeader className="bg-black text-white p-4">
            <CardTitle className="text-white font-bold flex items-center gap-2">
              <Play className="h-5 w-5" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-4">
            <div className="text-2xl font-bold text-white">{taskStats.inProgress}</div>
          </CardContent>
        </Card>

        <Card className="p-0 gap-0">
          <CardHeader className="bg-black text-white p-4">
            <CardTitle className="text-white font-bold flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-4">
            <div className="text-2xl font-bold text-white">{taskStats.completed}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-0 gap-0">
        <CardHeader className="bg-black text-white p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white font-bold">Latest Tasks</CardTitle>
            <div className="flex gap-2">
              <Link href="/tasks">
                <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                  View All Tasks
                </Button>
              </Link>
              <Link href="/tasks">
                <Button size="sm" className="bg-[#f9d022] text-black hover:bg-yellow-400">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent style={{ backgroundColor: "#f9d022" }} className="text-white p-6">
          {latestTasks.length > 0 ? (
            <div className="space-y-4">
              {latestTasks.map((task) => (
                <div key={task.id} className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{task.task_name}</h3>
                    <div className="flex items-center gap-2">
                      {task.task_types && (
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: task.task_types.color, color: "white" }}
                        >
                          {task.task_types.name}
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(task.status)}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {task.task_description && (
                    <p className="text-white text-sm mb-2 opacity-90">{task.task_description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-white opacity-75">
                    <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                    {task.end_date_time && <span>Due: {new Date(task.end_date_time).toLocaleDateString()}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckSquare className="h-12 w-12 text-white opacity-50 mx-auto mb-4" />
              <p className="text-white mb-4">No tasks found. Create your first task to get started!</p>
              <Link href="/tasks">
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Task
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
