export const ACTIONS = {
  ADD: "add",
  TOGGLE: "toggle",
  DELETE: "delete",
  CLEAR: "clear",
  INIT: "init",
};

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT:
      return action.payload;

    case ACTIONS.ADD:
      return [action.payload, ...state];

    case ACTIONS.TOGGLE:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case ACTIONS.DELETE:
      return state.filter(todo => todo.id !== action.payload);

    case ACTIONS.CLEAR:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
}