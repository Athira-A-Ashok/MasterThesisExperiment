import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ todo, dispatch }) {
  return (
    <li className={styles.item}>
      <label
        tabIndex="0"
        aria-label={`Mark ${todo.text} as completed`}
        onKeyDown={(e) => e.key === " "}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch({ type: "TOGGLE", payload: todo.id })}
        />

        <span className={todo.completed ? styles.done : ""}>
          {todo.text}
        </span>
      </label>

      <button
        aria-label={`Delete ${todo.text}`}
        onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
      >
        Delete
      </button>
    </li>
  );
}