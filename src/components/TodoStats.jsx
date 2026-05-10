import { useTodo } from "../context/TodoContext";
import { clearCompleted } from "../reducers/todoActions";
import { useCallback } from "react";

export default function TodoStats() {
  const { state, dispatch } = useTodo();

  const activeCount = state.todos.filter((t) => !t.completed).length;

  const clear = useCallback(() => {
    dispatch(clearCompleted());
  }, [dispatch]);

  return (
    <div>
      <p>{activeCount} items left</p>
      <button onClick={clear}>Clear Completed</button>
    </div>
  );
}