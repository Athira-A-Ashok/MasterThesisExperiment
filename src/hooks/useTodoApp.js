import { useTodos } from "./useTodos";
import { useFilter } from "./useFilter";
import { useSearch } from "./useSearch";
import { useStats } from "./useStats";

export function useTodoApp() {
  const todoLogic = useTodos();
  const { filter, setFilter, filteredTodos } = useFilter(todoLogic.todos);
  const { query, setQuery, debounced } = useSearch();
  const stats = useStats(todoLogic.todos);

  const searchedTodos = filteredTodos.filter((t) =>
    t.text.toLowerCase().includes(debounced.toLowerCase())
  );

  return {
    ...todoLogic,
    filter,
    setFilter,
    query,
    setQuery,
    todos: searchedTodos,
    stats,
  };
}