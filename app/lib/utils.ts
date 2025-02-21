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
