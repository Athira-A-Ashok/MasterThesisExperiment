import { ACTIONS } from "./actionTypes";

export const initialState = {
  todos: [],
};

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            text: action.payload.text,
            completed: false,
            createdAt: Date.now(),
          },
        ],
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload.id),
      };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...t, completed: !t.completed }
            : t
        ),
      };

    default:
      return state;
  }
}