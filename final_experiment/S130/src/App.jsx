import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
      <Footer />
    </div>
  );
}