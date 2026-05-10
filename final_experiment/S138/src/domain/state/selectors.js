export const getFilteredTodos = (todos, filter) => {
  switch (filter) {
    case "ACTIVE":
      return todos.filter((t) => !t.completed);
    case "COMPLETED":
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};

export const getRemainingCount = (todos) =>
  todos.filter((t) => !t.completed).length;