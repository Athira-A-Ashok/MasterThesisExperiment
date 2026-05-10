import TaskItem from "./TaskItem";

export default function TaskList({ tasks, dispatch }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 py-6">
        No tasks to show
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} dispatch={dispatch} />
      ))}
    </div>
  );
}