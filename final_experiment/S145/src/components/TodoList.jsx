import React, { useMemo } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  const rendered = useMemo(
    () =>
      todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      )),
    [todos, toggleTodo, deleteTodo]
  );

  return <ul>{rendered}</ul>;
}