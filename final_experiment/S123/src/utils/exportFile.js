export function exportTodos(todos) {
  const content = todos
    .map(t => `${t.text} [${t.completed ? "X" : " "}]`)
    .join("\n");

  const blob = new Blob([content], { type: "text/plain" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "todos.txt";
  a.click();

  URL.revokeObjectURL(url);
}