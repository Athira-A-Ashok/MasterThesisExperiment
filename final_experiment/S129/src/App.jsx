import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoFooter from "./components/TodoFooter";

function App() {
  return (
    <TodoProvider>
      <div>
        <h1>Todo App</h1>
        <TodoInput />
        <TodoFilter />
        <TodoList />
        <TodoFooter />
      </div>
    </TodoProvider>
  );
}

export default App;