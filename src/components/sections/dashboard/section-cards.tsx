//- src/components/sections/dashboard/section-cards.tsx

import {
} from "@/components/ui/card"
import { CardStat } from "./type"
import { GetPercentage } from "@/lib/number"
import {
  CalendarCheckOut02Icon,
  SteakIcon,
  Target02Icon,
  UserMultiple03Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"
import { GetRemainingDays } from "@/lib/date"
import { CardSectionStandard } from "@/components/core/card/section"

export const SectionCards = () => {
  const isLoading = false
  const targetAmount = 126000000
  const totalSaved = 5042000
  const totalParticipant = 29
  const tdate = "2027-05-17T00:00:00Z"

  const cardStats: CardStat[] = [
    {
      label: "Target Tabungan",
      value: targetAmount ?? 0,
      icon: Target02Icon,
      color: "text-primary",
      bgColor: "bg-amber-50",
      percentage: GetPercentage(totalSaved ?? 0, targetAmount ?? 0),
      currency: true,
    },
    {
      label: "Total Tabungan",
      value: totalSaved ?? 0,
      icon: Wallet01Icon,
      color: "text-chart-5",
      bgColor: "bg-neutral-100",
      currency: true,
    },
    {
      label: "Hewan Qurban",
      value: 7,
      icon: SteakIcon,
      color: "",
      bgColor: "bg-green-50",
      valueOpt: "ekor"
    },
    {
      label: "Peserta",
      value: totalParticipant ?? 0,
      icon: UserMultiple03Icon,
      color: "",
      bgColor: "bg-olive-50",
      valueOpt: "orang"
    },
    {
      label: "Menuju Idul Adha",
      value: GetRemainingDays(tdate?.toString() ?? ""),
      icon: CalendarCheckOut02Icon,
      color: "",
      bgColor: "bg-green-50",
      valueOpt: "hari lagi"
    },
  ]

  return <CardSectionStandard cardStats={cardStats} isLoading={isLoading} />
}
