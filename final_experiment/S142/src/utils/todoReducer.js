import { ACTIONS } from "./actionTypes";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INIT:
      return action.payload;

    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload
          ? { ...t, completed: !t.completed }
          : t
      );

    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);

    case ACTIONS.CLEAR_COMPLETED:
      return state.filter((t) => !t.completed);

    default:
      return state;
  }
};