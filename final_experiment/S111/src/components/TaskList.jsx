import TaskItem from "./TaskItem";

export default function TaskList({ tasks, dispatch }) {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} dispatch={dispatch} />
      ))}
    </div>
  );
}