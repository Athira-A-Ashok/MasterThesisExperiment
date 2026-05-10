export const initialState = {
  tasks: [],
  filter: "all",
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "LOAD":
      return action.payload;

    default:
      return state;
  }
}