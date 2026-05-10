// state/todoReducer.js

import { TODO_ACTIONS } from "./todoActions";

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO: {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    }

    case TODO_ACTIONS.TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    }

    case TODO_ACTIONS.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    }

    case TODO_ACTIONS.CLEAR_COMPLETED: {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    }

    case TODO_ACTIONS.SET_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }

    default:
      return state;
  }
}