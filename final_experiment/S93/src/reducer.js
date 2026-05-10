export const initialState = {
  todos: [],
  filter: "ALL",
};

export function todoReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const text = action.payload.trim();
      if (!text) return state;

      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }

    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_STATE":
      return action.payload;

    default:
      return state;
  }
}