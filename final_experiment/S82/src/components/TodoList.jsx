import TodoItem from "./TodoItem";

export default function TodoList({ todos, ...props }) {
  return (
    <div className="list">
      {todos.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} {...props} />
        ))
      )}
    </div>
  );
}