import { TaskProvider } from "./context/TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  return (
    <TaskProvider>
      <main>
        <h1>Todo App</h1>
        <TaskInput />
        <TaskList />
        <Footer />
      </main>
    </TaskProvider>
  );
}