export default function TaskItem({ task, dispatch }) {
  return (
    <div className="flex items-center justify-between border rounded-lg px-3 py-2">
      
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          dispatch({ type: "TOGGLE_TASK", payload: task.id })
        }
      />

      <span
        className={`flex-1 px-3 ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() =>
          dispatch({ type: "DELETE_TASK", payload: task.id })
        }
        className="text-red-500"
      >
        🗑
      </button>
    </div>
  );
}