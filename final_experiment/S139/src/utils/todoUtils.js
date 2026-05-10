export const createTodo = (text) => ({
  id: crypto.randomUUID(),
  text,
  completed: false,
  createdAt: Date.now(),
});

export const filterTodos = (todos, filter) => {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};