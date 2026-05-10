// src/reducer.js
export const initialState = {
  tasks: []
};

export const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  TOGGLE: "toggle",
  INIT: "init"
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case ACTIONS.TOGGLE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case ACTIONS.INIT:
      return {
        ...state,
        tasks: action.payload
      };

    default:
      return state;
  }
};