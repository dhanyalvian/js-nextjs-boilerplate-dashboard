//- src/lib/number.ts

import { locale } from "./base"

export const NumberFormatted = (number: number): string => {
  return new Intl.NumberFormat(locale).format(number)
}
