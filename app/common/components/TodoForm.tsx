import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import type { TodoFormData } from "../types/todo";
import { todoFormSchema, createFormDefaultValues } from "../constants";

// Tipe untuk form input
type TodoFormInput = z.infer<typeof todoFormSchema>;

type TodoFormProps = {
  initialData?: Partial<TodoFormData>;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export const TodoForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: TodoFormProps) => {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [files, setFiles] = useState<string[]>(initialData?.files || []);
  const [links, setLinks] = useState<string[]>(initialData?.links || []);
  const [reminders, setReminders] = useState<string[]>(
    initialData?.reminders || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    trigger,
  } = useForm<TodoFormInput>({
    resolver: zodResolver(todoFormSchema),
    mode: "onChange", // Validate on change
    defaultValues: createFormDefaultValues(initialData),
  });

  // Debug default values
  console.log("Form default values:", createFormDefaultValues(initialData));

  const handleFormSubmit = async (data: TodoFormInput) => {
    console.log("=== FORM SUBMISSION START ===");
    console.log("Form data received:", data);
    console.log("Current state:", { tags, files, links, reminders });
    console.log("Form errors:", errors);
    console.log("Form isValid:", isValid);
    console.log("Form isSubmitting:", isSubmitting);

    // Check if there are validation errors
    if (Object.keys(errors).length > 0) {
      console.error("Form validation errors:", errors);
      return;
    }

    // Validate required fields manually
    if (
      !data.title ||
      !data.description ||
      !data.startTime ||
      !data.endTime ||
      !data.category
    ) {
      console.error("Missing required fields:", {
        title: !!data.title,
        description: !!data.description,
        startTime: !!data.startTime,
        endTime: !!data.endTime,
        category: !!data.category,
      });
      return;
    }

    try {
      const formData: TodoFormData = {
        ...data,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        tags,
        files,
        links,
        reminders,
      };

      console.log("Processed form data:", formData);
      console.log("Calling onSubmit...");
      await onSubmit(formData);
      console.log("onSubmit completed successfully");
    } catch (error) {
      console.error("Error processing form data:", error);
    }

    console.log("=== FORM SUBMISSION END ===");
  };

  const addTag = () => {
    const input = document.getElementById("tagInput") as HTMLInputElement;
    if (input.value.trim()) {
      setTags([...tags, input.value.trim()]);
      input.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addFile = () => {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    if (input.value.trim()) {
      setFiles([...files, input.value.trim()]);
      input.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const addLink = () => {
    const input = document.getElementById("linkInput") as HTMLInputElement;
    if (input.value.trim()) {
      setLinks([...links, input.value.trim()]);
      input.value = "";
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const addReminder = () => {
    const input = document.getElementById("reminderInput") as HTMLInputElement;
    if (input.value.trim()) {
      setReminders([...reminders, input.value.trim()]);
      input.value = "";
    }
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={(e) => {
        console.log("Form submit event triggered");
        handleSubmit(handleFormSubmit)(e);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description *
          </label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time *
          </label>
          <input
            type="datetime-local"
            id="startTime"
            {...register("startTime")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-600">
              {errors.startTime.message}
            </p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time *
          </label>
          <input
            type="datetime-local"
            id="endTime"
            {...register("endTime")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-600">
              {errors.endTime.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category *
          </label>
          <input
            type="text"
            id="category"
            {...register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority *
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status *
          </label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id="tagInput"
            placeholder="Add tag"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Files */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Files</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id="fileInput"
            placeholder="Add file URL"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addFile}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {files.length > 0 && (
          <div className="mt-2 space-y-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-600">{file}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Links</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id="linkInput"
            placeholder="Add link URL"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addLink}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {links.length > 0 && (
          <div className="mt-2 space-y-1">
            {links.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-600">{link}</span>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reminders */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reminders
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="datetime-local"
            id="reminderInput"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addReminder}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {reminders.length > 0 && (
          <div className="mt-2 space-y-1">
            {reminders.map((reminder, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-600">
                  {new Date(reminder).toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => removeReminder(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            console.log("Test button clicked");
            console.log("Current form state:", {
              tags,
              files,
              links,
              reminders,
            });
            console.log("Form errors:", errors);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          Test Debug
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Todo"}
        </button>
      </div>
    </form>
  );
};
