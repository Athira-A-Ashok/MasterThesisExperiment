const KEY = "todos_v1";

export const todoStorage = {
  load() {
    try {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(todos) {
    try {
      localStorage.setItem(KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("Storage error:", e);
    }
  },
};