import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoStats from "../components/TodoStats";

export default function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoStats />
      <TodoList />
    </div>
  );
}