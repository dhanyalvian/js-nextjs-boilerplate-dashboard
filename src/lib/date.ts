//- src/lib/date.ts

import { locale } from "./base"

export const DateFormatted = (date: string | Date): string => {
  const formatted = new Date(date).toLocaleDateString(locale, {
    // weekday: 'long', // "Senin", "Selasa", etc.
    year: "numeric",
    month: "short",
    day: "2-digit",
  })

  return formatted
}

export const TimeFormatted = (date: string | Date): string => {
  let formatted = new Date(date).toLocaleDateString(locale, {
    // year: undefined,
    // month: undefined,
    // day: undefined,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).replace(".", ":")
  
  if (locale == "id-ID") {
    formatted += " WIB"
  }

  return formatted
}

export const DateTimeFormatted = (date: string | Date): string => {
  let formatted = new Date(date).toLocaleDateString(locale, {
    // weekday: 'long', // "Senin", "Selasa", etc.
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).replace(".", ":")
  
  if (locale == "id-ID") {
    formatted += " WIB"
  }

  return formatted
}
