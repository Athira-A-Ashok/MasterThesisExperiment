import { useTodo } from "../context/TodoContext";
import { setFilter, setSearch } from "../reducers/todoActions";
import { useCallback } from "react";

export default function TodoFilters() {
  const { state, dispatch } = useTodo();

  const changeFilter = useCallback(
    (f) => dispatch(setFilter(f)),
    [dispatch]
  );

  const onSearch = useCallback(
    (e) => dispatch(setSearch(e.target.value)),
    [dispatch]
  );

  return (
    <div>
      <input placeholder="Search..." onChange={onSearch} />

      <button onClick={() => changeFilter("ALL")}>All</button>
      <button onClick={() => changeFilter("ACTIVE")}>Active</button>
      <button onClick={() => changeFilter("COMPLETED")}>Completed</button>
    </div>
  );
}