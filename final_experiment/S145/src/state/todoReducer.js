import { ACTIONS } from "./actions";

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload
            ? { ...t, completed: !t.completed }
            : t
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

    default:
      return state;
  }
}