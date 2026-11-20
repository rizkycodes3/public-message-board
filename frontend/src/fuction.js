export function getError(error) {
  const message = error.response?.data?.message ?? error.message ?? "An unexpected error occurred";
  return Array.isArray(message) ? message.join(", ") : message;
}

export function capitalizeWords(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
