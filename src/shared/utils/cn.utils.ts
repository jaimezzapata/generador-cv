export type ClassValue = string | number | boolean | undefined | null;

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter((item): item is string | number => Boolean(item) && typeof item !== "boolean")
    .join(" ");
}

