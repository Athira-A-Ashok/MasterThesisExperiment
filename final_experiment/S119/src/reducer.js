export const initialState = {
  todos: []
};

export function todoReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { todos: action.payload };

    case "ADD":
      return {
        todos: [action.payload, ...state.todos]
      };

    case "TOGGLE":
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case "DELETE":
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case "CLEAR_COMPLETED":
      return {
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}