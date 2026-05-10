import { useEffect, useMemo, useReducer } from "react";
import { todoReducer } from "../../state/reducer";
import { initialState } from "../../state/initialState";
import { storage } from "../../utils/storage";
import { getFilteredTodos, getRemainingCount } from "../../state/selectors";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import TodoStats from "./TodoStats";

export default function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    storage.save(state.todos);
  }, [state.todos]);

  const filteredTodos = useMemo(
    () => getFilteredTodos(state.todos, state.filter),
    [state.todos, state.filter]
  );

  const remaining = useMemo(
    () => getRemainingCount(state.todos),
    [state.todos]
  );

  return (
    <section>
      <h1>Todo App</h1>

      <TodoInput dispatch={dispatch} />

      <TodoFilters dispatch={dispatch} current={state.filter} />

      <TodoStats remaining={remaining} />

      <TodoList todos={filteredTodos} dispatch={dispatch} />
    </section>
  );
}