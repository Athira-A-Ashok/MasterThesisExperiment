export const ACTIONS = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  TOGGLE: 'TOGGLE'
};

export function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.DELETE:
      return state.filter(task => task.id !== action.payload);

    case ACTIONS.TOGGLE:
      return state.map(task =>
        task.id === action.payload
          ? { ...task, resolved: !task.resolved }
          : task
      );

    default:
      return state;
  }
}