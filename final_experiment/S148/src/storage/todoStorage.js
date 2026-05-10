// storage/todoStorage.js

const STORAGE_KEY = "todos_app_v1";

export const todoStorage = {
  load: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Failed to load todos", err);
      return [];
    }
  },

  save: (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      console.error("Failed to save todos", err);
    }
  },
};  