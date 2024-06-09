import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function minmaxrand(minValue: number, maxValue: number): number {
  return Math.random() * (maxValue - minValue) + minValue;
}