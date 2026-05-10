import { useReducer, useEffect, useRef } from "react";

const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
        },
        ...state,
      ];

    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);

    case ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );

    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, []);
  const inputRef = useRef(null);

  const addTodo = (text) => {
    if (!text.trim()) return;
    dispatch({ type: ACTIONS.ADD, payload: text.trim() });
  };

  const deleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
    inputRef.current?.focus(); // focus back to input
  };

  const toggleTodo = (id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  };

  const activeCount = todos.filter((t) => !t.completed).length;

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    activeCount,
    inputRef,
  };
}