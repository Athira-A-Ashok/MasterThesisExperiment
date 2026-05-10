import { useState, useRef } from 'react';
import { useTodos } from '../hooks/useTodos';

export default function TodoInput() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const { addTask } = useTodos();

  const handleSubmit = () => {
    const trimmed = text.trim();

    if (!trimmed) {
      setError('Task cannot be empty');
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      resolved: false,
      createdAt: new Date().toISOString()
    };

    addTask(newTask);

    setText('');
    setError('');
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        aria-label="Add task"
      />
      <button onClick={handleSubmit}>Add</button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}