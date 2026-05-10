export const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
  UPDATE: "UPDATE",
  SET_ALL: "SET_ALL",
  REORDER: "REORDER",
  BATCH_DELETE: "BATCH_DELETE",
  BATCH_COMPLETE: "BATCH_COMPLETE",
};

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.DELETE:
      return state.filter(t => t.id !== action.payload);

    case ACTIONS.TOGGLE:
      return state.map(t =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );

    case ACTIONS.UPDATE:
      return state.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload.data } : t
      );

    case ACTIONS.REORDER:
      return action.payload;

    case ACTIONS.BATCH_DELETE:
      return state.filter(t => !action.payload.includes(t.id));

    case ACTIONS.BATCH_COMPLETE:
      return state.map(t =>
        action.payload.includes(t.id)
          ? { ...t, completed: true }
          : t
      );

    case ACTIONS.SET_ALL:
      return action.payload;

    default:
      return state;
  }
}