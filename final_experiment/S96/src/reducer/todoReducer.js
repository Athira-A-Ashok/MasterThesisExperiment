import { ACTIONS } from "./todoActions";

export const initialState = {
  todos: [],
  filter: "ALL",
  search: "",
};

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      if (!action.payload.trim()) return state;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            text: action.payload.trim(),
            completed: false,
          },
        ],
      };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
      };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload };

    default:
      return state;
  }
}