import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  const addTodo = (text) => {
    // prevent duplicate submissions (optional rule)
    const exists = todos.some((t) => t.text === text);
    if (exists) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <TodoInput onAdd={addTodo} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}