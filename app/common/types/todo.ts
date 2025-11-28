export type Todo = {
  id: string;
  title: string;
  description: string; // long text
  startTime: Date; // date and time iso format
  endTime: Date; // date and time iso format
  files: string[]; // url files attachments
  links: string[]; // ref links
  tags: string[]; // related tags
  reminders: string[]; // reminders time in iso format
  category: string; // category
  priority: "low" | "medium" | "high"; // priority
  status: "pending" | "progress" | "completed" | "cancelled"; // status
  createdAt: Date; // date and time iso format
  updatedAt: Date; // date and time iso format
  userId: string; // user id
  userName: string; // user name
  userEmail: string; // user email
  userAvatar: string; // user avatar url
};

export type TodoFormData = Omit<
  Todo,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "userId"
  | "userName"
  | "userEmail"
  | "userAvatar"
>;

export type TodoFilters = {
  search: string;
  status: Todo["status"] | "all";
  priority: Todo["priority"] | "all";
  category: string;
  sortBy:
    | "createdAt"
    | "updatedAt"
    | "startTime"
    | "endTime"
    | "priority"
    | "title";
  sortOrder: "asc" | "desc";
};
