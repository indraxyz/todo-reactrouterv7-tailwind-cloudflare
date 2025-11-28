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
} from "lucide-react";
import type { Todo } from "../types/todo";
import {
  PRIORITY_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CONFIRMATION_MESSAGES,
} from "../constants";

type TodoCardProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  showActions?: boolean;
};

export const TodoCard = ({
  todo,
  onDelete,
  isSelected = false,
  onSelect,
  showActions = true,
}: TodoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: Todo["priority"]) => {
    return PRIORITY_COLORS[priority] || PRIORITY_COLORS.default;
  };

  const getStatusColor = (status: Todo["status"]) => {
    return STATUS_COLORS[status] || STATUS_COLORS.default;
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

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(CONFIRMATION_MESSAGES.DELETE_TODO)) {
      onDelete(todo.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {onSelect && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onSelect(todo.id, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {todo.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {todo.description}
            </p>
          </div>
        </div>

        {/* Priority and Status */}
        <div className="flex items-center gap-2 mt-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
              todo.priority
            )}`}
          >
            {PRIORITY_LABELS[todo.priority]}
          </span>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              todo.status
            )}`}
          >
            {STATUS_LABELS[todo.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Time Information */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDate(todo.startTime)} - {formatDate(todo.endTime)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            {formatTime(todo.startTime)} - {formatTime(todo.endTime)}
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Tag className="w-4 h-4" />
          <span>{todo.category}</span>
        </div>

        {/* Tags */}
        {todo.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {todo.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
              {todo.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{todo.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Files and Links */}
        {(todo.files.length > 0 || todo.links.length > 0) && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {todo.files.length > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>{todo.files.length} file(s)</span>
              </div>
            )}
            {todo.links.length > 0 && (
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <span>{todo.links.length} link(s)</span>
              </div>
            )}
          </div>
        )}

        {/* Reminders */}
        {todo.reminders.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bell className="w-4 h-4" />
            <span>{todo.reminders.length} reminder(s)</span>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <img
              src={todo.userAvatar}
              alt={todo.userName}
              className="w-6 h-6 rounded-full"
            />
            <span>{todo.userName}</span>
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="pt-3 border-t border-gray-200 space-y-3">
            {/* Full Description */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Description
              </h4>
              <p className="text-sm text-gray-600">{todo.description}</p>
            </div>

            {/* Files */}
            {todo.files.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Files
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
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Links
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
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Reminders
                </h4>
                <div className="space-y-1">
                  {todo.reminders.map((reminder, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {new Date(reminder).toLocaleString("id-ID")}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="text-xs text-gray-500">
              <div>
                Created: {new Date(todo.createdAt).toLocaleString("id-ID")}
              </div>
              <div>
                Updated: {new Date(todo.updatedAt).toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {showActions && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>

            <div className="flex items-center gap-2">
              <Link
                to={`/todos/${todo.id}`}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                to={`/todos/${todo.id}/edit`}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
