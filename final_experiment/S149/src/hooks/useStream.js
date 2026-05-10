import { useReducer, useMemo } from "react";

const initialState = {
  tasks: [],
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload
            ? { ...t, completed: !t.completed }
            : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      };

    case "HYDRATE":
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
}

export function useStream() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTasks = useMemo(() => {
    if (state.filter === "active") {
      return state.tasks.filter((t) => !t.completed);
    }
    if (state.filter === "completed") {
      return state.tasks.filter((t) => t.completed);
    }
    return state.tasks;
  }, [state.tasks, state.filter]);

  return { state, dispatch, filteredTasks };
}