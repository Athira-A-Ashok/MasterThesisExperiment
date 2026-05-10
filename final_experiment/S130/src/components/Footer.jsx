import { useTodos } from "../hooks/useTodos";

export default function Footer() {
  const { filter, setFilter, remaining } = useTodos();

  return (
    <footer>
      <span>{remaining} items left</span>

      <div>
        <button onClick={() => setFilter("all")} aria-label="All tasks">
          All
        </button>
        <button onClick={() => setFilter("active")} aria-label="Active tasks">
          Active
        </button>
        <button onClick={() => setFilter("completed")} aria-label="Completed tasks">
          Completed
        </button>
      </div>
    </footer>
  );
}