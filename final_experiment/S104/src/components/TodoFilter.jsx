import { useTodos } from "../hooks/useTodos";

export default function TodoFilter() {
  const { filter, setFilter, todos, clearCompleted } = useTodos();

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <div>
      <span>{remaining} items left</span>

      <div>
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("ACTIVE")}>Active</button>
        <button onClick={() => setFilter("COMPLETED")}>Completed</button>
      </div>

      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}