export function validateTodoInput(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    return { valid: false, error: "Task cannot be empty" };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "Max 100 characters allowed" };
  }

  return { valid: true, value: trimmed };
}