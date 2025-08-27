import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price)
}

export function calculateTotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}
