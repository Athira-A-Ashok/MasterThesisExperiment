import { useTodoContext } from "../context/TodoContext";

export default function TodoFooter() {
  const { activeCount } = useTodoContext();

  return <p>{activeCount} tasks remaining</p>;
}