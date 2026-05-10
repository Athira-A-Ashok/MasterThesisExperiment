export const ACTIONS = {
  ADD: "add",
  TOGGLE: "toggle",
  DELETE: "delete",
  CLEAR_COMPLETED: "clear_completed",
};

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
          createdAt: Date.now(),
        },
      ];

    case ACTIONS.TOGGLE:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case ACTIONS.DELETE:
      return state.filter((todo) => todo.id !== action.payload);

    case ACTIONS.CLEAR_COMPLETED:
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
}