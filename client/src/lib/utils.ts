import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a readable format
 * @param dateString ISO date string
 * @param formatStr Optional format string (defaults to 'dd MMM yyyy')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, formatStr = 'dd MMM yyyy'): string {
  try {
    const date = parseISO(dateString)
    return format(date, formatStr)
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}
