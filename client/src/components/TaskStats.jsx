import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";

export const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In-progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <ListTodo className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-pending" />
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
