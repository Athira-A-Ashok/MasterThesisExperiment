import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTodo } from "../context/TodoContext";
import { addTodo } from "../reducer/todoActions";

function TodoInput() {
  const [text, setText] = useState("");
  const { dispatch } = useTodo();

  const handleAdd = useCallback(() => {
    dispatch(addTodo(text));
    setText("");
  }, [dispatch, text]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleAdd();
    },
    [handleAdd]
  );

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

TodoInput.propTypes = {};

export default TodoInput;