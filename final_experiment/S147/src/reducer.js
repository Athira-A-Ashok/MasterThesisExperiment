export const ACTIONS = {
  ADD: "add",
  TOGGLE: "toggle",
  DELETE: "delete",
  CLEAR_COMPLETED: "clear_completed",
  SET_FILTER: "set_filter",
};

export const initialState = {
  tasks: [],
  filter: "all",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload
            ? { ...t, completed: !t.completed }
            : t
        ),
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}