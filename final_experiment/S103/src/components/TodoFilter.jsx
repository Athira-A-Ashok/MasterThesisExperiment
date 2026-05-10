import { useTodos } from "../hooks/useTodos";
import styles from "../styles/TodoFilter.module.css";

export default function TodoFilter() {
  const { state, dispatch } = useTodos();

  const activeCount = state.todos.filter(t => !t.completed).length;

  return (
    <div className={styles.footer}>
      <span>{activeCount} items left</span>

      <div className={styles.filters}>
        {["ALL", "ACTIVE", "COMPLETED"].map(f => (
          <button
            key={f}
            onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
            aria-pressed={state.filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <button
        onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
      >
        Clear Completed
      </button>
    </div>
  );
}