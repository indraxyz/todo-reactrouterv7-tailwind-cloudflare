import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Trash2, Grid3X3, List } from "lucide-react";
import { useTodos } from "../../common/hooks/useTodos";
import { TodoCard } from "../../common/components/TodoCard";
import { TodoTable } from "../../common/components/TodoTable";
import { TodoFilters } from "../../common/components/TodoFilters";
import { TodoStats } from "../../common/components/TodoStats";
import { TodoDataInfo } from "../../common/components/TodoDataInfo";
import { ClientOnly } from "../../common/components/ClientOnly";
import { toast } from "sonner";
import {
  TOAST_MESSAGES,
  CONFIRMATION_MESSAGES,
  PAGE_CONTENT,
  EMPTY_STATE_MESSAGES,
} from "../../common/constants";

const TodosPage: React.FC = () => {
  const {
    todos,
    allTodos,
    filters,
    setFilters,
    deleteTodo,
    deleteMultipleTodos,
    stats,
    categories,
    resetToMockData,
    clearAllTodos,
    isUsingMockData,
  } = useTodos();

  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);

  const handleSelectTodo = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedTodos([...selectedTodos, id]);
    } else {
      setSelectedTodos(selectedTodos.filter((todoId) => todoId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedTodos(todos.map((todo) => todo.id));
    } else {
      setSelectedTodos([]);
    }
  };

  const handleDeleteMultiple = () => {
    if (selectedTodos.length === 0) {
      toast.error(TOAST_MESSAGES.NO_TODOS_SELECTED);
      return;
    }

    if (confirm(CONFIRMATION_MESSAGES.DELETE_MULTIPLE(selectedTodos.length))) {
      deleteMultipleTodos(selectedTodos);
      setSelectedTodos([]);
      toast.success(`${selectedTodos.length} todos deleted successfully`);
    }
  };

  const handleSort = (field: string) => {
    setFilters({
      ...filters,
      sortBy: field as any,
      sortOrder:
        filters.sortBy === field && filters.sortOrder === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleResetToMock = () => {
    if (confirm(CONFIRMATION_MESSAGES.RESET_TO_MOCK)) {
      resetToMockData();
      setSelectedTodos([]);
      toast.success(TOAST_MESSAGES.RESET_TO_MOCK_SUCCESS);
    }
  };

  const handleClearAll = () => {
    if (confirm(CONFIRMATION_MESSAGES.CLEAR_ALL)) {
      clearAllTodos();
      setSelectedTodos([]);
      toast.success(TOAST_MESSAGES.CLEAR_ALL_SUCCESS);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {PAGE_CONTENT.TODOS.title}
              </h1>
              <p className="mt-2 text-gray-600">
                {PAGE_CONTENT.TODOS.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedTodos.length > 0 && (
                <button
                  onClick={handleDeleteMultiple}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedTodos.length})
                </button>
              )}
              <Link
                to="/todos/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Todo
              </Link>
            </div>
          </div>
        </div>

        {/* Data Info */}
        <ClientOnly>
          <TodoDataInfo
            totalTodos={allTodos.length}
            isUsingMockData={isUsingMockData}
            onResetToMock={handleResetToMock}
            onClearAll={handleClearAll}
          />
        </ClientOnly>

        {/* Statistics */}
        <ClientOnly>
          <TodoStats stats={stats} />
        </ClientOnly>

        {/* Filters and View Toggle */}
        <ClientOnly>
          <TodoFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </ClientOnly>

        {/* Results Summary */}
        <ClientOnly>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {todos.length} of {todos.length} todos
              {selectedTodos.length > 0 && (
                <span className="ml-2 text-blue-600">
                  • {selectedTodos.length} selected
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>View:</span>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded ${
                  viewMode === "table"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded ${
                  viewMode === "card"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="Card View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ClientOnly>

        {/* Content */}
        <ClientOnly>
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <List className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {EMPTY_STATE_MESSAGES.NO_TODOS_FOUND}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filters.search ||
                filters.status !== "all" ||
                filters.priority !== "all" ||
                filters.category
                  ? EMPTY_STATE_MESSAGES.NO_TODOS_FILTERED
                  : EMPTY_STATE_MESSAGES.NO_TODOS_INITIAL}
              </p>
              {!filters.search &&
                filters.status === "all" &&
                filters.priority === "all" &&
                !filters.category && (
                  <div className="mt-6">
                    <Link
                      to="/todos/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Todo
                    </Link>
                  </div>
                )}
            </div>
          ) : (
            <>
              {viewMode === "table" ? (
                <TodoTable
                  todos={todos}
                  onDelete={deleteTodo}
                  selectedTodos={selectedTodos}
                  onSelectTodo={handleSelectTodo}
                  onSelectAll={handleSelectAll}
                  sortBy={filters.sortBy}
                  sortOrder={filters.sortOrder}
                  onSort={handleSort}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {todos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onDelete={deleteTodo}
                      isSelected={selectedTodos.includes(todo.id)}
                      onSelect={handleSelectTodo}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </ClientOnly>

        {/* Bulk Actions Footer */}
        <ClientOnly>
          {selectedTodos.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedTodos.length} todo
                  {selectedTodos.length !== 1 ? "s" : ""} selected
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedTodos([])}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Clear Selection
                  </button>
                  <button
                    onClick={handleDeleteMultiple}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2 inline" />
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}
        </ClientOnly>
      </div>
    </div>
  );
};

export default TodosPage;
