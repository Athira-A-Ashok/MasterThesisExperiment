export function sanitizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

export function createTodo(text) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now()
  };
}