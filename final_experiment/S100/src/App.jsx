import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

const App = () => {
  return (
    <TodoProvider>
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <h1>Todo App</h1>
        <TodoInput />
        <TodoList />
        <TodoFilter />
      </div>
    </TodoProvider>
  );
};

export default App;