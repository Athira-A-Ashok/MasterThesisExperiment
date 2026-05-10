export function useFilter(todos, { status, priority, query }) {
  return todos.filter(todo => {
    const matchStatus =
      status === "all" ||
      (status === "completed" && todo.completed) ||
      (status === "active" && !todo.completed);

    const matchPriority =
      priority === "all" || todo.priority === priority;

    const matchQuery =
      todo.text.toLowerCase().includes(query.toLowerCase());

    return matchStatus && matchPriority && matchQuery;
  });
}