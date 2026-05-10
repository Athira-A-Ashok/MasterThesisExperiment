import { TodoProvider } from './context/TodoContext';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <TodoProvider>
      <h1>Todo App</h1>
      <TodoInput />
      <TodoList />
    </TodoProvider>
  );
}