
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ptPT } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 * @param date The date to format
 * @param formatString The format to use (defaults to 'PPP')
 * @returns The formatted date string
 */
export function formatDate(date: Date, formatString: string = "dd/MM/yyyy") {
  return format(date, formatString, { locale: ptPT });
}

/**
 * Format a number as currency (EUR)
 * @param amount The amount to format
 * @returns The formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
