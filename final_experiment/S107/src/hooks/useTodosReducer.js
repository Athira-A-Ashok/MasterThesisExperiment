import { useReducer, useEffect } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;

    case "ADD":
      return [action.payload, ...state];

    case "TOGGLE":
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE":
      return state.filter(task => task.id !== action.payload);

    default:
      return state;
  }
}

export function useTodosReducer(initialData) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "INIT", payload: initialData });
  }, [initialData]);

  return { state, dispatch };
}