export default function TodoFooter({ todos }) {
  const remaining = todos.filter(t => !t.completed).length;

  return <div>{remaining} items left</div>;
}