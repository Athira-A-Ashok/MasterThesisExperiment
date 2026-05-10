import { useTodos } from "../hooks/useTodos";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";
import styles from "../styles/TodoApp.module.css";

export default function TodoApp() {
  const todo = useTodos();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className={`${styles.container} w-full max-w-xl bg-white shadow-lg rounded-xl p-4`}>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Todo App
        </h1>

        <TodoInput onAdd={todo.addTodo} />

        <TodoList
          todos={todo.todos}
          onToggle={todo.toggleTodo}
          onDelete={todo.deleteTodo}
        />

        <TodoFooter
          activeCount={todo.activeCount}
          filter={todo.filter}
          setFilter={todo.setFilter}
          clearCompleted={todo.clearCompleted}
          hasCompleted={todo.rawTodos.some((t) => t.completed)}
          FILTERS={todo.FILTERS}
        />
      </div>
    </div>
  );
}