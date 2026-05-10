import { useReducer } from "react";
import useLocalStorage from "./useLocalStorage";

const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);

    case ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );

    case ACTIONS.CLEAR_COMPLETED:
      return state.filter((t) => !t.completed);

    default:
      return state;
  }
}

export default function useTodos() {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);

  const [todos, dispatch] = useReducer(reducer, storedTodos);

  // Sync reducer → localStorage
  const update = (action) => {
    const updated = reducer(todos, action);
    setStoredTodos(updated);
    dispatch(action);
  };

  return {
    todos,
    addTodo: (text) =>
      update({ type: ACTIONS.ADD, payload: text.trim() }),

    deleteTodo: (id) =>
      update({ type: ACTIONS.DELETE, payload: id }),

    toggleTodo: (id) =>
      update({ type: ACTIONS.TOGGLE, payload: id }),

    clearCompleted: () =>
      update({ type: ACTIONS.CLEAR_COMPLETED }),
  };
}