import { useTasks } from "../context/TaskContext";

export default function Footer() {
  const { tasks } = useTasks();

  const remaining = tasks.filter(t => !t.completed).length;

  return (
    <footer>
      <p>{remaining} items left</p>
    </footer>
  );
}