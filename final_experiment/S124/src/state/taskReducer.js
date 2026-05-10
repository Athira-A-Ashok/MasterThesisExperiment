export const ACTIONS = {
  ADD: "ADD_TASK",
  TOGGLE: "TOGGLE_TASK",
  DELETE: "DELETE_TASK",
  SET: "SET_TASKS"
};

export function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [action.payload, ...state];

    case ACTIONS.TOGGLE:
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case ACTIONS.DELETE:
      return state.filter(task => task.id !== action.payload);

    case ACTIONS.SET:
      return action.payload;

    default:
      return state;
  }
}