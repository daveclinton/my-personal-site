import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export const focusInput = [
  "focus:ring-2",
  "focus:ring-pink-200 focus:dark:ring-pink-700/30",
  "focus:border-pink-500 focus:dark:border-pink-700",
];

export const focusRing = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",

  "outline-pink-500 dark:outline-pink-500",
];

export const hasErrorInput = [
  "ring-2",
  "border-red-500 dark:border-red-700",
  "ring-red-200 dark:ring-red-700/30",
];
