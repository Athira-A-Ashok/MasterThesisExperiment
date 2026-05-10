import { useState, useMemo } from "react";
import { useTasks } from "./state/useTasks";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskFooter from "./components/TaskFooter";

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState("all");

  // ✅ Derived filtering (NOT stored in state)
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter(t => !t.completed);
      case "completed":
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  );

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <TaskFilter current={filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      <TaskFooter count={activeCount} />
    </div>
  );
}