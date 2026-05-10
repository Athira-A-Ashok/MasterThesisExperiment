import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useTodo } from "../context/TodoContext";
import { toggleTodo, deleteTodo } from "../reducer/todoActions";

function TodoItem({ todo }) {
  const { dispatch } = useTodo();

  const onToggle = useCallback(() => {
    dispatch(toggleTodo(todo.id));
  }, [dispatch, todo.id]);

  const onDelete = useCallback(() => {
    dispatch(deleteTodo(todo.id));
  }, [dispatch, todo.id]);

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.text}
      </span>
      <button onClick={onDelete}>X</button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default React.memo(TodoItem);