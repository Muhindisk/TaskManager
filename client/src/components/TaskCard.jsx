import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  Pending: { color: "bg-pending", label: "Pending" },
  "In-progress": { color: "bg-warning", label: "In Progress" },
  Completed: { color: "bg-success", label: "Completed" },
};

export const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusInfo = statusConfig[task.status];
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-card-foreground">{task.title}</h3>
          <Badge className={`${statusInfo.color} text-white`}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-3 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(task)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task._id)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
