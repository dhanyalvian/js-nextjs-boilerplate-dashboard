//- src/lib/currency.ts

import { currency, locale } from "./base";

export const CurrencyFormatted = (number: number) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2, // Set to 2 if you need decimals (e.g., ,00)
    maximumFractionDigits: 2,
  }).format(number);
}
