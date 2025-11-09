import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllTasks, createTask, updateTask, deleteTask } from "@/services/api";
import { TaskCard } from "@/components/TaskCard";
import { TaskFormModal } from "@/components/TaskFormModal";
import { TaskStats } from "@/components/TaskStats";
import { TaskFilters } from "@/components/TaskFilters";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchQuery, statusFilter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllTasks();
      // Handle the response format from the server
      const taskData = response.data || response;
      setTasks(taskData);
    } catch (err) {
      setError(
        err.message || "Failed to load tasks. Please try again."
      );
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      const newTask = response.data || response;
      setTasks([...tasks, newTask]);
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to create task",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask?._id) return;

    try {
      const response = await updateTask(editingTask._id, taskData);
      const updatedTask = response.data || response;
      setTasks(tasks.map((t) => (t._id === editingTask._id ? updatedTask : t)));
      setIsModalOpen(false);
      setEditingTask(null);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Task Manager</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Backend Connection Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Backend Connection Error</AlertTitle>
            <AlertDescription>
              {error}
              <br />
              <br />
              <strong>To connect your backend:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Update the BASE_URL in src/services/api.js</li>
                <li>Make sure your Express server is running</li>
                <li>Enable CORS in your Express app</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="mb-8">
          <TaskStats tasks={tasks} />
        </div>

        {/* Filters and Add Button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full">
            <TaskFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Task List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "No tasks found matching your filters"
                : "No tasks yet. Create your first task!"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}

        {/* Task Form Modal */}
        <TaskFormModal
          open={isModalOpen}
          onOpenChange={handleModalClose}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
        />
      </div>
    </div>
  );
};

export default Index;
