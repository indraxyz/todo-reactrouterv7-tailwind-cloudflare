import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { TodoForm } from "../../common/components/TodoForm";
import { useTodos } from "../../common/hooks/useTodos";
import { toast } from "sonner";
import type { TodoFormData } from "../../common/types/todo";
import {
  TOAST_MESSAGES,
  PAGE_CONTENT,
  TODO_FORM_TIPS,
} from "../../common/constants";

export default function NewTodoPage() {
  const navigate = useNavigate();
  const { createTodo } = useTodos();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TodoFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTodo = createTodo(data);
      console.log("Todo created, navigating to:", newTodo.id);

      // Wait a bit to ensure state is updated
      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success(TOAST_MESSAGES.TODO_CREATED);
      navigate(`/todos/${newTodo.id}`);
    } catch (error) {
      toast.error(TOAST_MESSAGES.TODO_CREATE_ERROR);
      console.error("Error creating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/todos");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/todos"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Todos
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {PAGE_CONTENT.NEW_TODO.title}
            </h1>
            <p className="mt-2 text-gray-600">
              {PAGE_CONTENT.NEW_TODO.subtitle}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {PAGE_CONTENT.NEW_TODO.form_title}
            </h2>
            <p className="text-sm text-gray-600">
              {PAGE_CONTENT.NEW_TODO.form_subtitle}
            </p>
          </div>

          <TodoForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">
            {PAGE_CONTENT.NEW_TODO.tips_title}
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {TODO_FORM_TIPS.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <Plus className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
