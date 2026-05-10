import TodoItem from "./TodoItem";

export default function TodoList({ todos, dispatch }) {
  return (
    <ul role="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}