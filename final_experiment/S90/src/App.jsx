import { useSelector } from "react-redux";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

export default function App() {
  const { items, filter } = useSelector(state => state.todo);

  const filtered = items.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Redux Todo App</h1>

      <TodoForm />
      <TodoFilter />

      <div className="list">
        {filtered.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}