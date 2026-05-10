export const validateTodoText = (text) => {
  if (typeof text !== "string") return false;
  if (!text.trim()) return false;
  if (text.trim().length > 120) return false;
  return true;
};