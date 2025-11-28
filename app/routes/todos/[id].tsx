import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Tag,
  FileText,
  Link as LinkIcon,
  Bell,
  User,
  AlertCircle,
} from "lucide-react";
import { useTodos } from "../../common/hooks/useTodos";
import { toast } from "sonner";

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoById, deleteTodo } = useTodos();

  const todo = getTodoById(id!);

  if (!todo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Todo not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The todo you're looking for doesn't exist or has been deleted.
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

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(todo.id);
      toast.success("Todo deleted successfully!");
      navigate("/todos");
    }
  };

  const getPriorityColor = (priority: typeof todo.priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: typeof todo.status) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/todos"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Todos
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/todos/${todo.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{todo.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{todo.description}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and Priority */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Status & Priority
              </h2>
              <div className="flex flex-wrap gap-3">
                <span
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                    todo.status
                  )}`}
                >
                  {todo.status === "progress"
                    ? "In Progress"
                    : todo.status.charAt(0).toUpperCase() +
                      todo.status.slice(1)}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getPriorityColor(
                    todo.priority
                  )}`}
                >
                  {todo.priority.charAt(0).toUpperCase() +
                    todo.priority.slice(1)}{" "}
                  Priority
                </span>
                <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  {todo.category}
                </span>
              </div>
            </div>

            {/* Time Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Time Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Start Time
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDateTime(todo.startTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      End Time
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDateTime(todo.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {todo.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Files */}
            {todo.files.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Files ({todo.files.length})
                </h2>
                <div className="space-y-2">
                  {todo.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">{file}</span>
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {todo.links.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Links ({todo.links.length})
                </h2>
                <div className="space-y-2">
                  {todo.links.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600 truncate">
                        {link}
                      </span>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-2"
                      >
                        Open
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reminders */}
            {todo.reminders.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Reminders ({todo.reminders.length})
                </h2>
                <div className="space-y-2">
                  {todo.reminders.map((reminder, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">
                        {formatDateTime(new Date(reminder))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* User Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                User Information
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={todo.userAvatar}
                  alt={todo.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {todo.userName}
                  </p>
                  <p className="text-sm text-gray-600">{todo.userEmail}</p>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Timestamps
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(todo.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Last Updated
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(todo.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to={`/todos/${todo.id}/edit`}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Todo
                </Link>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
