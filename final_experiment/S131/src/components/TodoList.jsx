import { useState, useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { tasks, toggleTask, deleteTask } = useTodos();
  const [filter, setFilter] = useState('ALL');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'ACTIVE':
        return tasks.filter(t => !t.resolved);
      case 'COMPLETED':
        return tasks.filter(t => t.resolved);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const remaining = tasks.filter(t => !t.resolved).length;

  return (
    <>
      <ul>
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>

      <div>
        <button onClick={() => setFilter('ALL')}>All</button>
        <button onClick={() => setFilter('ACTIVE')}>Active</button>
        <button onClick={() => setFilter('COMPLETED')}>Completed</button>
      </div>

      <p>{remaining} tasks remaining</p>
    </>
  );
}