import TodoItem from "./TodoItem";

export default function TodoList({ tasks, dispatch }) {
  return (
    <ul role="list">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} dispatch={dispatch} />
      ))}
    </ul>
  );
}