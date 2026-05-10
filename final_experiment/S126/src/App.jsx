import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import TodoFooter from "./components/TodoFooter";

export default function App() {
  return (
    <TodoProvider>
      <div className="app">
        <h1>Todo App</h1>
        <TodoInput />
        <TodoFilters />
        <TodoList />
        <TodoFooter />
      </div>
    </TodoProvider>
  );
}