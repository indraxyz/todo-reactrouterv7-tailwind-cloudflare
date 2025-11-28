import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { TodoForm } from "../../../common/components/TodoForm";
import { useTodos } from "../../../common/hooks/useTodos";
import { toast } from "sonner";
import type { TodoFormData } from "../../../common/types/todo";

export default function EditTodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoById, updateTodo } = useTodos();
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<TodoFormData | null>(null);

  const todo = getTodoById(id!);

  useEffect(() => {
    if (todo) {
      // Pass arrays directly without conversion
      const formData: TodoFormData = {
        title: todo.title,
        description: todo.description,
        startTime: todo.startTime,
        endTime: todo.endTime,
        category: todo.category,
        priority: todo.priority,
        status: todo.status,
        tags: todo.tags,
        files: todo.files,
        links: todo.links,
        reminders: todo.reminders,
      };
      setInitialData(formData);
    }
  }, [todo]);

  if (!todo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Todo not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The todo you're trying to edit doesn't exist or has been deleted.
          </p>
          <div className="mt-6">
            <Link
              to="/todos"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Todos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Loading todo data...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: TodoFormData) => {
    setIsLoading(true);
    try {
      console.log("Submitting edit with data:", data);
      console.log("Updating todo ID:", todo.id);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateTodo(todo.id, data);
      console.log("Todo updated, navigating to:", todo.id);

      // Wait a bit to ensure state is updated
      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success("Todo updated successfully!");
      navigate(`/todos/${todo.id}`);
    } catch (error) {
      toast.error("Failed to update todo. Please try again.");
      console.error("Error updating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/todos/${todo.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Link
              to={`/todos/${todo.id}`}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Todo Details
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Edit Todo</h1>
            <p className="mt-2 text-lg text-gray-600">
              Update the details for "{todo.title}"
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Todo Details</h2>
            <p className="text-sm text-gray-600">
              Make changes to the todo below. All fields marked with * are
              required.
            </p>
          </div>

          <TodoForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>

        {/* Current Status Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">
            Current Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Status:</span>
              <span className="ml-2 text-blue-700">
                {todo.status === "progress"
                  ? "In Progress"
                  : todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Priority:</span>
              <span className="ml-2 text-blue-700">
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Category:</span>
              <span className="ml-2 text-blue-700">{todo.category}</span>
            </div>
          </div>
          <div className="mt-3 text-sm text-blue-700">
            <span className="font-medium">Last Updated:</span>
            <span className="ml-2">
              {new Date(todo.updatedAt).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Editing Tips:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                You can modify any field including status, priority, and timing
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                Tags, files, and links can be added, removed, or modified
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>Reminders can be updated to reflect new deadlines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                All changes will be tracked with a new updated timestamp
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
