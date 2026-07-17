//- src/components/sections/dashboard/section-cards.tsx

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpIcon,
  BanknoteArrowDownIcon,
  BanknoteIcon,
  BeefIcon,
  Equal,
} from "lucide-react"
import { TbTargetArrow } from "react-icons/tb"

export function SectionCards() {
  const Cards = [
    {
      title: "Tabungan Qurban",
      icon: BeefIcon,
      value: "Rp 84.500.000",
      trend: "18%",
      trendIcon: ArrowUpIcon,
      trendInfo: "dari tahun lalu",
    },
    {
      title: "Target Qurban",
      icon: TbTargetArrow,
      value: "Rp 107.800.000",
      trend: "18%",
      trendIcon: ArrowUpIcon,
      trendInfo: "dari tahun lalu",
      percentage: 96,
    },
    {
      title: "Total Anggaran",
      description: "Total number of orders placed",
      icon: BanknoteIcon,
      value: "Rp 583.000.000",
      trend: "+4.5%",
      trendIcon: Equal,
      footer: "Sama seperti bulan sebelumnya",
      optional: "Tidak ada pembayaran",
    },
    {
      title: "Total Pengeluaran",
      description: "Total number of orders placed",
      icon: BanknoteArrowDownIcon,
      value: "Rp 283.000.000",
      trend: "+4.5%",
      trendIcon: Equal,
      footer: "Sama seperti bulan sebelumnya",
      optional: "Tidak ada pembayaran",
    },
  ]

  return (
    <div className="*:data-[slot=card]:bg-white *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Cards.map((card) => (
        <Card className="@container/card gap-10 py-0 pt-4" key={card.title}>
          <CardHeader>
            <div className="flex gap-5">
              <div>
                <card.icon
                  className="size-16 p-3 bg-emerald-100/60 text-emerald-700 rounded-xl"
                  absoluteStrokeWidth
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="text-sm">{card.title}</div>
                <div className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                  {card.value}
                </div>

                {card.percentage && (
                  <div className="flex items-center gap-4 w-full max-w-md">
                    <Progress
                      value={card.percentage}
                      className="h-2 bg-emerald-100 [&>div]:bg-emerald-500"
                    />
                    <span className="text-xs text-slate-700 min-w-10">
                      {card.percentage}%
                    </span>
                  </div>
                )}

                {card.trend && (
                  <div>
                    <Badge variant="outline">
                      <card.trendIcon className="size-3" />
                      <div className="text-xs text-muted-foreground font-normal">
                        {card.trend} {card.trendInfo}
                      </div>
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
