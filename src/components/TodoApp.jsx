import { useTodos } from "../hooks/useTodos";
import { useSearch } from "../hooks/useSearch";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFilter } from "../hooks/useFilter";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import TodoToolbar from "./TodoToolbar";

export default function TodoApp() {
  const { state, dispatch, ACTIONS } = useTodos();
  const { input, setInput, query } = useSearch();
  const { dark, setDark } = useDarkMode();

  const filtered = useFilter(state, {
    status: "all",
    priority: "all",
    query,
  });

  return (
    <main>
      <TodoToolbar dark={dark} setDark={setDark} />

      <TodoInput
        input={input}
        setInput={setInput}
        dispatch={dispatch}
        ACTIONS={ACTIONS}
      />

      <TodoFilters />

      <TodoList todos={filtered} dispatch={dispatch} ACTIONS={ACTIONS} />
    </main>
  );
}