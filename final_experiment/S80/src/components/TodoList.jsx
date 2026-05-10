import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-text">No tasks yet. Add one!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;