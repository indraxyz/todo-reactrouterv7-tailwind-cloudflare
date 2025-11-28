import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Tag,
  FileText,
  Link as LinkIcon,
  Bell,
  User,
  Trash2,
  Edit,
  Eye,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { Todo } from "../types/todo";

type TodoTableProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  selectedTodos: string[];
  onSelectTodo: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
};

export const TodoTable = ({
  todos,
  onDelete,
  selectedTodos,
  onSelectTodo,
  onSelectAll,
  sortBy,
  sortOrder,
  onSort,
}: TodoTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getPriorityColor = (priority: Todo["priority"]) => {
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

  const getStatusColor = (status: Todo["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
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
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this todo?")) {
      onDelete(id);
    }
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <th
      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortBy === field &&
          (sortOrder === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={
                  selectedTodos.length === todos.length && todos.length > 0
                }
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <SortableHeader field="title">Title</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <SortableHeader field="priority">Priority</SortableHeader>
            <SortableHeader field="category">Category</SortableHeader>
            <SortableHeader field="startTime">Start Time</SortableHeader>
            <SortableHeader field="endTime">End Time</SortableHeader>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {todos.map((todo) => (
            <>
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedTodos.includes(todo.id)}
                    onChange={(e) => onSelectTodo(todo.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={todo.userAvatar}
                        alt={todo.userName}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {todo.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {todo.description.length > 50
                          ? `${todo.description.substring(0, 50)}...`
                          : todo.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      todo.status
                    )}`}
                  >
                    {todo.status === "progress"
                      ? "In Progress"
                      : todo.status.charAt(0).toUpperCase() +
                        todo.status.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      todo.priority
                    )}`}
                  >
                    {todo.priority.charAt(0).toUpperCase() +
                      todo.priority.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {todo.category}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(todo.startTime)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(todo.startTime)}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {formatDate(todo.endTime)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(todo.endTime)}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRow(todo.id)}
                      className="text-gray-600 hover:text-blue-600 p-1 rounded"
                      title={expandedRows.has(todo.id) ? "Collapse" : "Expand"}
                    >
                      {expandedRows.has(todo.id) ? "−" : "+"}
                    </button>
                    <Link
                      to={`/todos/${todo.id}`}
                      className="text-gray-600 hover:text-blue-600 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/todos/${todo.id}/edit`}
                      className="text-gray-600 hover:text-green-600 p-1 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={(e) => handleDelete(e, todo.id)}
                      className="text-gray-600 hover:text-red-600 p-1 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRows.has(todo.id) && (
                <tr>
                  <td colSpan={8} className="px-3 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Tags */}
                      {todo.tags.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Tags
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {todo.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Files */}
                      {todo.files.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            Files ({todo.files.length})
                          </h4>
                          <div className="space-y-1">
                            {todo.files.map((file, index) => (
                              <div
                                key={index}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {file}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      {todo.links.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <LinkIcon className="w-4 h-4" />
                            Links ({todo.links.length})
                          </h4>
                          <div className="space-y-1">
                            {todo.links.map((link, index) => (
                              <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline block"
                              >
                                {link}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reminders */}
                      {todo.reminders.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Bell className="w-4 h-4" />
                            Reminders ({todo.reminders.length})
                          </h4>
                          <div className="space-y-1">
                            {todo.reminders.map((reminder, index) => (
                              <div
                                key={index}
                                className="text-sm text-gray-600"
                              >
                                {new Date(reminder).toLocaleString("id-ID")}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* User Info */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          User Info
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>Name: {todo.userName}</div>
                          <div>Email: {todo.userEmail}</div>
                        </div>
                      </div>

                      {/* Timestamps */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Timestamps
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>
                            Created:{" "}
                            {new Date(todo.createdAt).toLocaleString("id-ID")}
                          </div>
                          <div>
                            Updated:{" "}
                            {new Date(todo.updatedAt).toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
