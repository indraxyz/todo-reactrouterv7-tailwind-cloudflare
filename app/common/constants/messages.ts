// Toast messages
export const TOAST_MESSAGES = {
  TODO_CREATED: "Todo created successfully!",
  TODO_UPDATED: "Todo updated successfully!",
  TODO_DELETED: "Todo deleted successfully!",
  TODO_CREATE_ERROR: "Failed to create todo. Please try again.",
  TODO_UPDATE_ERROR: "Failed to update todo. Please try again.",
  TODO_DELETE_ERROR: "Failed to delete todo. Please try again.",
  RESET_TO_MOCK_SUCCESS: "Reset to mock data successfully",
  CLEAR_ALL_SUCCESS: "All todos cleared successfully",
  NO_TODOS_SELECTED: "No todos selected",
} as const;

// Confirmation messages
export const CONFIRMATION_MESSAGES = {
  DELETE_TODO: "Are you sure you want to delete this todo?",
  DELETE_MULTIPLE: (count: number) =>
    `Are you sure you want to delete ${count} selected todos?`,
  RESET_TO_MOCK:
    "Are you sure you want to reset to mock data? This will replace all current todos.",
  CLEAR_ALL:
    "Are you sure you want to clear all todos? This action cannot be undone.",
} as const;

// Empty state messages
export const EMPTY_STATE_MESSAGES = {
  NO_TODOS_FOUND: "No todos found",
  NO_TODOS_FILTERED: "Try adjusting your filters or search terms.",
  NO_TODOS_INITIAL: "Get started by creating a new todo.",
} as const;

// Page titles and descriptions
export const PAGE_CONTENT = {
  HOME: {
    title: "Manage Your Todos Like a Pro",
    subtitle:
      "A powerful and intuitive todo management application that helps you stay organized, track progress, and achieve your goals efficiently.",
    overview_title: "Your Todo Overview",
    overview_subtitle: "Quick insights into your current todo status",
    features_title: "Powerful Features",
    features_subtitle: "Everything you need to manage your todos effectively",
    cta_title: "Ready to Get Organized?",
    cta_subtitle:
      "Start managing your todos today and experience the difference in your productivity.",
    footer_title: "Todo Management App",
    footer_subtitle:
      "Built with React, TypeScript, and Tailwind CSS for modern web development.",
  },
  TODOS: {
    title: "Todo Management",
    subtitle: "Manage and organize your todos efficiently",
  },
  NEW_TODO: {
    title: "Create New Todo",
    subtitle: "Add a new todo item to your list",
    form_title: "Todo Details",
    form_subtitle: "Fill in the details below to create your new todo",
    tips_title: "Tips for creating effective todos:",
  },
} as const;
