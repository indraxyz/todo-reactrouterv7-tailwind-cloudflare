import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("todos", "routes/todos/index.tsx"),
  route("todos/new", "routes/todos/new.tsx"),
  route("todos/:id", "routes/todos/[id].tsx"),
  route("todos/:id/edit", "routes/todos/[id]/edit.tsx"),
] satisfies RouteConfig;
