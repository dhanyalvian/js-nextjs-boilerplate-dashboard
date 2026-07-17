//- src/lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
  // ... (Paste the function from Step 1 here or import it)
  if (!name) return ""
  const words = name.trim().split(/\s+/)

  if (words.length >= 2) {
    return (
      words[0].charAt(0).toUpperCase() +
      words[1].charAt(0).toUpperCase()
    )
  } else if (words.length === 1 && words[0].length > 0) {
    return words[0].charAt(0).toUpperCase()
  }

  return ""
}
