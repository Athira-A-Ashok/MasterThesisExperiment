import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;

    const reader = new FileReader();

    if (file) {
      reader.onload = () => {
        onAdd(text, {
          name: file.name,
          type: file.type,
          data: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      onAdd(text, null);
    }

    setText("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <button>Add</button>
    </form>
  );
}