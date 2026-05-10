const KEY = "todos_app";

export const loadTodos = () => {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos) => {
  localStorage.setItem(KEY, JSON.stringify(todos));
};