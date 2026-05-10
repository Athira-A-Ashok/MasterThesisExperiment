export const initialState = {
  todos: []
};

export function todoReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { todos: action.payload };

    case "ADD":
      return { todos: [action.payload, ...state.todos] };

    case "DELETE":
      return {
        todos: state.todos.filter(t => t.id !== action.payload)
      };

    case "TOGGLE":
      return {
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        )
      };

    case "EDIT":
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, text: action.payload.text } : t
        )
      };

    case "SET_PRIORITY":
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, priority: action.payload.priority } : t
        )
      };

    default:
      return state;
  }
}