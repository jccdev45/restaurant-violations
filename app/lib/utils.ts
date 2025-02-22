import type { RedaxiosError } from "@/types/axios-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRedaxiosError(error: unknown): error is RedaxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("response" in error || "request" in error || "message" in error)
  );
}

export function formatPhoneNumber(input: string) {
  const cleaned = input.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return input;
}

export function generateInspectionId(
  camis: string,
  inspection_date: string
): string {
  return `${camis}-${inspection_date}`;
}
