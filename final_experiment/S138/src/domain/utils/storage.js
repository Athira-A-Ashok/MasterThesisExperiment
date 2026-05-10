const STORAGE_KEY = "todos_app_v1";

export const storage = {
  load: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save: (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
};