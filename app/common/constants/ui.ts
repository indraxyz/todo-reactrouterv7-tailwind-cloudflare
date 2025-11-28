import {
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  ListTodo,
  BarChart3,
  Search,
  Filter,
  Grid3X3,
  Table,
  XCircle,
  User,
} from "lucide-react";

// Home page features configuration
export const HOME_FEATURES = [
  {
    icon: Plus,
    title: "Create Todos",
    description:
      "Easily create new todos with detailed information including priority, status, and deadlines.",
    color: "bg-blue-500",
  },
  {
    icon: ListTodo,
    title: "Manage Tasks",
    description:
      "View, edit, and organize your todos efficiently with both card and table views.",
    color: "bg-green-500",
  },
  {
    icon: Search,
    title: "Search & Filter",
    description:
      "Find specific todos quickly with advanced search and filtering capabilities.",
    color: "bg-purple-500",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your productivity with comprehensive statistics and progress tracking.",
    color: "bg-orange-500",
  },
  {
    icon: Grid3X3,
    title: "Flexible Views",
    description:
      "Switch between card and table views to match your preferred way of organizing tasks.",
    color: "bg-indigo-500",
  },
  {
    icon: Clock,
    title: "Time Management",
    description:
      "Set start and end times, add reminders, and manage deadlines effectively.",
    color: "bg-red-500",
  },
];

// Home page stats configuration factory
export const createHomeStatsConfig = (todoStats: {
  total: number;
  progress: number;
  completed: number;
  pending: number;
}) => [
  {
    label: "Total Todos",
    value: todoStats.total.toString(),
    icon: ListTodo,
    color: "text-blue-600",
  },
  {
    label: "In Progress",
    value: todoStats.progress.toString(),
    icon: TrendingUp,
    color: "text-orange-600",
  },
  {
    label: "Completed",
    value: todoStats.completed.toString(),
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    label: "Pending",
    value: todoStats.pending.toString(),
    icon: Clock,
    color: "text-gray-600",
  },
];

// Todo stats cards configuration
export const TODO_STAT_CARDS = [
  {
    title: "Total Todos",
    field: "total" as const,
    icon: ListTodo,
    color: "bg-blue-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending",
    field: "pending" as const,
    icon: Clock,
    color: "bg-gray-500",
    textColor: "text-gray-600",
    bgColor: "bg-gray-50",
  },
  {
    title: "In Progress",
    field: "progress" as const,
    icon: TrendingUp,
    color: "bg-orange-500",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Completed",
    field: "completed" as const,
    icon: CheckCircle,
    color: "bg-green-500",
    textColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Cancelled",
    field: "cancelled" as const,
    icon: XCircle,
    color: "bg-red-500",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
  },
];

// Priority color mappings
export const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
  default: "bg-gray-100 text-gray-800 border-gray-200",
} as const;

// Status color mappings
export const STATUS_COLORS = {
  pending: "bg-gray-100 text-gray-800 border-gray-200",
  progress: "bg-orange-100 text-orange-800 border-orange-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  default: "bg-gray-100 text-gray-800 border-gray-200",
} as const;

// Status display labels
export const STATUS_LABELS = {
  pending: "Pending",
  progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
} as const;

// Priority display labels
export const PRIORITY_LABELS = {
  low: "Low Priority",
  medium: "Medium Priority",
  high: "High Priority",
} as const;
