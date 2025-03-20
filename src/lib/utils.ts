import { type ClassValue, clsx } from "clsx";
import { format, isValid } from "date-fns";
import { pt } from "date-fns/locale"; // pt é o código correto para português de Portugal
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind classes dynamically
 * @param inputs Class values to merge
 * @returns A merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 * @param date The date to format
 * @param formatString The format to use (defaults to 'dd/MM/yyyy')
 * @returns The formatted date string or "Data inválida" if the date is not valid
 */
export function formatDate(date: Date, formatString: string = "dd/MM/yyyy"): string {
  if (!(date instanceof Date) || !isValid(date)) {
    return "Data inválida";
  }
  return format(date, formatString, { locale: pt });
}

/**
 * Format a number as currency (EUR)
 * @param amount The amount to format
 * @returns The formatted currency string
 */
const currencyFormatter = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}
