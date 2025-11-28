import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { mockTodos } from "../data/mockData";
import type { Todo, TodoFormData, TodoFilters } from "../types/todo";
import { safeLocalStorage } from "../utils/storage";

// Local storage key
const TODOS_STORAGE_KEY = "todos-app-data";
const FILTERS_STORAGE_KEY = "todos-app-filters";

// Helper functions for localStorage
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = safeLocalStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects for todos
      if (key === TODOS_STORAGE_KEY && Array.isArray(parsed)) {
        return parsed.map((todo: any) => ({
          ...todo,
          startTime: new Date(todo.startTime),
          endTime: new Date(todo.endTime),
          reminders: todo.reminders.map(
            (reminder: string) => new Date(reminder)
          ),
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        })) as T;
      }
      return parsed;
    }
  } catch (error) {
    console.warn(`Failed to load data from localStorage key "${key}":`, error);
  }
  return defaultValue;
};

const saveToStorage = <T>(key: string, value: T): void => {
  try {
    safeLocalStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save data to localStorage key "${key}":`, error);
  }
};

export const useTodos = () => {
  // State untuk tracking hydration
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize todos dengan default values (akan di-update setelah hydration)
  const [todos, setTodos] = useState<Todo[]>(mockTodos);

  // Initialize filters dengan default values
  const [filters, setFilters] = useState<TodoFilters>({
    search: "",
    status: "all" as const,
    priority: "all" as const,
    category: "",
    sortBy: "createdAt" as const,
    sortOrder: "desc" as const,
  });

  // Load data dari localStorage setelah komponen di-mount (client-side only)
  useEffect(() => {
    const storedTodos = loadFromStorage(TODOS_STORAGE_KEY, mockTodos);
    const storedFilters = loadFromStorage(FILTERS_STORAGE_KEY, {
      search: "",
      status: "all" as const,
      priority: "all" as const,
      category: "",
      sortBy: "createdAt" as const,
      sortOrder: "desc" as const,
    });

    setTodos(storedTodos);
    setFilters(storedFilters);
    setIsHydrated(true);

    // Jika no stored data, save mock data
    if (storedTodos === mockTodos) {
      saveToStorage(TODOS_STORAGE_KEY, mockTodos);
    }
  }, []);

  // Use ref to track current state
  const todosRef = useRef<Todo[]>(todos);
  todosRef.current = todos;

  // Save todos to localStorage whenever they change (hanya setelah hydration)
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(TODOS_STORAGE_KEY, todos);
    }
  }, [todos, isHydrated]);

  // Save filters to localStorage whenever they change (hanya setelah hydration)
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(FILTERS_STORAGE_KEY, filters);
    }
  }, [filters, isHydrated]);

  // Create new todo
  const createTodo = useCallback((todoData: TodoFormData) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "user-1",
      userName: "John Doe",
      userEmail: "john@example.com",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    };

    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, []);

  // Update existing todo
  const updateTodo = useCallback(
    (id: string, updates: Partial<TodoFormData>) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
        )
      );
    },
    []
  );

  // Delete single todo
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Delete multiple todos
  const deleteMultipleTodos = useCallback((ids: string[]) => {
    setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)));
  }, []);

  // Get todo by id
  const getTodoById = useCallback(
    (id: string) => {
      return todos.find((todo) => todo.id === id);
    },
    [todos]
  );

  // Reset to mock data (useful for development/testing)
  const resetToMockData = useCallback(() => {
    setTodos(mockTodos);
    saveToStorage(TODOS_STORAGE_KEY, mockTodos);
  }, []);

  // Clear all todos
  const clearAllTodos = useCallback(() => {
    setTodos([]);
    saveToStorage(TODOS_STORAGE_KEY, []);
  }, []);

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((todo) => todo.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== "all") {
      filtered = filtered.filter((todo) => todo.priority === filters.priority);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((todo) => todo.category === filters.category);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[filters.sortBy];
      let bValue: any = b[filters.sortBy];

      if (
        filters.sortBy === "createdAt" ||
        filters.sortBy === "updatedAt" ||
        filters.sortBy === "startTime" ||
        filters.sortBy === "endTime"
      ) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [todos, filters]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(todos.map((todo) => todo.category));
    return Array.from(uniqueCategories).sort();
  }, [todos]);

  // Get statistics
  const stats = useMemo(() => {
    const total = todos.length;
    const pending = todos.filter((todo) => todo.status === "pending").length;
    const progress = todos.filter((todo) => todo.status === "progress").length;
    const completed = todos.filter(
      (todo) => todo.status === "completed"
    ).length;
    const cancelled = todos.filter(
      (todo) => todo.status === "cancelled"
    ).length;

    return { total, pending, progress, completed, cancelled };
  }, [todos]);

  // Check if currently using mock data
  const isUsingMockData = useMemo(() => {
    if (todos.length !== mockTodos.length) return false;

    // Compare todos with mock data
    return todos.every((todo, index) => {
      const mockTodo = mockTodos[index];
      return (
        todo.id === mockTodo.id &&
        todo.title === mockTodo.title &&
        todo.description === mockTodo.description
      );
    });
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filters,
    setFilters,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteMultipleTodos,
    getTodoById,
    categories,
    stats,
    resetToMockData,
    clearAllTodos,
    isUsingMockData,
  };
};
