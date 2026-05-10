import TodoItem from "./TodoItem";

function TodoList({ todos, dispatch }) {
  if (todos.length === 0) {
    return <p className="empty">No tasks yet</p>;
  }

  return (
    <div className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default TodoList;