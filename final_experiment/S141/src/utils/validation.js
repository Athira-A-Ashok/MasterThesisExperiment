import { MAX_TITLE_LENGTH } from "./constants";

export function validateTodo(title, existingTodos) {
  const errors = {};

  const trimmed = title.trim();

  if (!trimmed) {
    errors.title = "Task cannot be empty.";
    return { valid: false, errors };
  }

  if (trimmed.length > MAX_TITLE_LENGTH) {
    errors.title = `Max ${MAX_TITLE_LENGTH} characters allowed.`;
    return { valid: false, errors };
  }

  const duplicate = existingTodos.some(
    (t) => t.title.toLowerCase() === trimmed.toLowerCase()
  );

  if (duplicate) {
    errors.title = "This task already exists.";
    return { valid: false, errors };
  }

  return { valid: true, value: trimmed };
}