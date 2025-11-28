// Filter options for todo filters
export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const PRIORITY_FILTER_OPTIONS = [
  { value: "all", label: "All Priority" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const SORT_BY_OPTIONS = [
  { value: "createdAt", label: "Created Date" },
  { value: "updatedAt", label: "Updated Date" },
  { value: "startTime", label: "Start Time" },
  { value: "endTime", label: "End Time" },
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
];

// Default filter values
export const DEFAULT_FILTERS = {
  search: "",
  status: "all" as const,
  priority: "all" as const,
  category: "",
  sortBy: "createdAt" as const,
  sortOrder: "desc" as const,
};
