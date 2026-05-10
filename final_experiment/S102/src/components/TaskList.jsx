import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleTask, deleteTask }) {
  // Empty state
  if (tasks.length === 0) {
    return <p className="empty">No tasks found</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;