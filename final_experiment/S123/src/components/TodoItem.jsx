import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ todo, dispatch, ACTIONS }) {
  return (
    <article className={styles.item} draggable>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          dispatch({ type: ACTIONS.TOGGLE, payload: todo.id })
        }
      />

      <div className={todo.completed ? styles.done : ""}>
        <h4>{todo.text}</h4>
        <small>{todo.priority}</small>
      </div>

      <button
        aria-label="delete"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE, payload: todo.id })
        }
      >
        🗑
      </button>
    </article>
  );
}