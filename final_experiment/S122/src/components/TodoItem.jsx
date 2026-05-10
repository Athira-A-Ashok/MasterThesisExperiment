import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div
      className={`${styles.item} flex items-center justify-between p-2 border rounded`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          className={
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500"
      >
        🗑
      </button>
    </div>
  );
}