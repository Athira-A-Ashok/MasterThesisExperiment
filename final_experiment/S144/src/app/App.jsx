import { useEffect, useMemo, useReducer, useCallback } from "react";
import { reducer, initialState, ACTIONS } from "./reducer";
import { loadState, useLocalStorage } from "../hooks/useLocalStorage";
import { filterTodos } from "../utils/filters";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";
import TodoFooter from "../components/TodoFooter";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    init => loadState("todos-app", init)
  );

  useLocalStorage("todos-app", state);

  const filteredTodos = useMemo(() => {
    return filterTodos(state.todos, state.filter);
  }, [state.todos, state.filter]);

  const addTodo = useCallback((text) => {
    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
    });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  }, []);

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <TodoFilter filter={state.filter} setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <TodoFooter todos={state.todos} />
    </div>
  );
}