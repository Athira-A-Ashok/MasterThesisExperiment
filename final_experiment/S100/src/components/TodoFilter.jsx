import { useTodos } from "../hooks/useTodos";
import styles from "./TodoFilter.module.css";

const TodoFilter = () => {
  const { filter, setFilter, activeCount, clearCompleted } = useTodos();

  return (
    <div className={styles.container}>
      <span aria-label="Active tasks count">
        {activeCount} items left
      </span>

      <div>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? styles.active : ""}
            aria-label={`Show ${f} tasks`}
          >
            {f}
          </button>
        ))}
      </div>

      <button
        onClick={clearCompleted}
        aria-label="Clear completed tasks"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFilter;