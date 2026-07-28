//- src/lib/number.ts

import { locale } from "./base"

export const NumberFormatted = (number: number): string => {
  return new Intl.NumberFormat(locale).format(number)
}

export const GetPercentage = (value: number, totalValue: number) => {
  if (totalValue === 0) return 0

  return +((value * 100) / totalValue).toFixed(1)
}
