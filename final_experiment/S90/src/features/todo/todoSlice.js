import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};

const saveState = (state) => {
  localStorage.setItem("todos", JSON.stringify(state));
};

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: loadState(),
    filter: "all",
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
      saveState(state.items);
    },

    deleteTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
      saveState(state.items);
    },

    toggleTodo: (state, action) => {
      state.items = state.items.map(t =>
        t.id === action.payload
          ? { ...t, completed: !t.completed }
          : t
      );
      saveState(state.items);
    },

    editTodo: (state, action) => {
      const { id, title } = action.payload;
      state.items = state.items.map(t =>
        t.id === id ? { ...t, title } : t
      );
      saveState(state.items);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;