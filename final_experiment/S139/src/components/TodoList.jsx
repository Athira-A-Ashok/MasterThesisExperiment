import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <div>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};