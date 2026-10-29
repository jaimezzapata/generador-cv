export function createUniqueId(prefix = "item"): string {
  const randomPart = Math.random().toString(36).substring(2, 9);
  const timePart = Date.now().toString(36).slice(-4);
  return `${prefix}_${timePart}${randomPart}`;
}

