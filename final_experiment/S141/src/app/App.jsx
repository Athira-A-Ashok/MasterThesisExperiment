import { useMemo, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import Filters from "../components/Filters";
import Counter from "../components/Counter";
import { FILTERS } from "../utils/constants";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState(FILTERS.ALL);

  const filtered = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return todos.filter((t) => !t.completed);
      case FILTERS.COMPLETED:
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} todos={todos} />

      <Counter count={activeCount} />

      <Filters filter={filter} setFilter={setFilter} />

      <TodoList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}