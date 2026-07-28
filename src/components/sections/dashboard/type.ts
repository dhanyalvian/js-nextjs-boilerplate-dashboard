//- src/components/sections/dashboard/type.ts

import { type IconSvgElement } from "@hugeicons/react"

export interface CardStat {
  label: string,
  value: number,
  icon: IconSvgElement,
  color?: string,
  bgColor?: string,
  valueOpt?: string,
  percentage?: number,
  currency?: boolean,
}
