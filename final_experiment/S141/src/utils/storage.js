const KEY = "todos_v1";

export function loadTodos() {
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return [];

    return JSON.parse(data);
  } catch (e) {
    console.warn("Failed to parse todos, resetting storage.");
    localStorage.removeItem(KEY);
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(KEY, JSON.stringify(todos));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      alert("Storage full. Please delete some tasks.");
    } else {
      console.error("Storage error:", e);
    }
  }
}