//- src/lib/animate.ts

import { useEffect, useState } from "react"
import { FormatRupiah } from "./currency"
import { NumberFormatted } from "./number"

export const ANIMATION_DURATION = 1500

interface AnimatedCounterProps {
  end: number,
  currency?: boolean,
}
export const AnimatedCounter = ({ end, currency = false }: AnimatedCounterProps) => {
  const validEnd = isNaN(end) ? 0 : end
  const [prevEnd, setPrevEnd] = useState(validEnd)
  const [count, setCount] = useState(validEnd > 0 ? 0 : validEnd)

  if (validEnd !== prevEnd) {
    setPrevEnd(validEnd)
    setCount(validEnd > 0 ? 0 : validEnd)
  }

  useEffect(() => {
    if (validEnd <= 0) return

    const duration = ANIMATION_DURATION
    const steps = 60
    const increment = validEnd / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= validEnd) {
        setCount(validEnd)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [validEnd])

  if (currency) {
    return FormatRupiah(count)
  }

  return NumberFormatted(count)
}
