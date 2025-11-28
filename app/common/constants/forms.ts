import { z } from "zod";

// Todo form validation schema
export const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "progress", "completed", "cancelled"]),
});

// Form default values factory
export const createFormDefaultValues = (initialData?: any) => ({
  title: initialData?.title || "",
  description: initialData?.description || "",
  startTime: initialData?.startTime
    ? new Date(initialData.startTime).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16), // Default to current time
  endTime: initialData?.endTime
    ? new Date(initialData.endTime).toISOString().slice(0, 16)
    : new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16), // Default to 1 hour later
  category: initialData?.category || "",
  priority: initialData?.priority || "medium",
  status: initialData?.status || "pending",
});

// Form tips for new todo page
export const TODO_FORM_TIPS = [
  {
    text: "Use clear, specific titles that describe what needs to be done",
  },
  {
    text: "Set realistic start and end times to help with planning",
  },
  {
    text: "Choose appropriate priority levels to focus on what matters most",
  },
  {
    text: "Add relevant tags to organize and find related todos easily",
  },
  {
    text: "Include helpful links and files for reference",
  },
];
