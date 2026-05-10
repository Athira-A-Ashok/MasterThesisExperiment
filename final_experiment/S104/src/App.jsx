import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

export default function App() {
  return (
    <TodoProvider>
      <div className="app">
        <h1>Todo App</h1>
        <TodoInput />
        <TodoList />
        <TodoFilter />
      </div>
    </TodoProvider>
  );
}