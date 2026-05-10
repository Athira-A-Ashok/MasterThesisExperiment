import { memo, useCallback } from "react";
import { useTodos } from "../context/TodoContext";

function TodoItem({ task }) {
  const { dispatch } = useTodos();

  const toggle = useCallback(() => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  }, [dispatch, task.id]);

  const remove = useCallback(() => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
  }, [dispatch, task.id]);

  return (
    <li className={task.completed ? "completed" : ""}>
      <input type="checkbox" checked={task.completed} onChange={toggle} />
      <span>{task.text}</span>
      <button onClick={remove}>❌</button>
    </li>
  );
}

export default memo(TodoItem);