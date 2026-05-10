export const initialState = {
  todos: [],
  filter: "all",
};

export const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  SET_FILTER: "SET_FILTER",
  SET_STATE: "SET_STATE",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case ACTIONS.SET_STATE:
      return action.payload;

    default:
      return state;
  }
}