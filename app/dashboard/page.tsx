import { Dashboard } from "@/components/dashboard"
import { getLatestTasks, getTaskStats } from "@/lib/actions/dashboard"

export default async function DashboardPage() {
  const [latestTasks, taskStats] = await Promise.all([getLatestTasks(5), getTaskStats()])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your latest tasks and activities</p>
      </div>
      <Dashboard latestTasks={latestTasks} taskStats={taskStats} />
    </div>
  )
}
