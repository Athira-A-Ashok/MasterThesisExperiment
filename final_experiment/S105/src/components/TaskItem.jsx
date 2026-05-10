import { memo } from "react";
import { useTasks } from "../context/TaskContext";
import { ACTIONS } from "../reducer/taskReducer";

function TaskItem({ task }) {
  const { dispatch } = useTasks();

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        aria-label="Toggle task"
        onChange={() =>
          dispatch({ type: ACTIONS.TOGGLE, payload: task.id })
        }
      />

      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>

      <button
        aria-label="Delete task"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE, payload: task.id })
        }
      >
        ❌
      </button>
    </li>
  );
}

export default memo(TaskItem);