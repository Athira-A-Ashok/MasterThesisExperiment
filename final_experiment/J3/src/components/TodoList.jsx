import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <div>
      {props.todos.map(todo => (
        <TodoItem key={todo.id} {...props} todo={todo} />
      ))}
    </div>
  );
}