import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCSSVariableColor(variable: string): string {
  if (typeof window === 'undefined') return 'hsl(220, 70%, 42%)'
  const root = document.documentElement
  const value = getComputedStyle(root).getPropertyValue(variable).trim()
  if (!value) return 'hsl(220, 70%, 42%)'
  return `hsl(${value})`
}
