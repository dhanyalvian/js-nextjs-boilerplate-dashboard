//- src/components/core/card/section.tsx

"use client"

import { CardStat } from "@/components/sections/dashboard/type"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/lib/animate"
import { HugeiconsIcon } from "@hugeicons/react"

interface CardSectionStandardProps {
  cardStats: CardStat[],
  isLoading?: boolean,
}

export const CardSectionStandard = ({
  cardStats,
  isLoading = false,
}: CardSectionStandardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {isLoading
        ? Array.from({ length: cardStats.length }).map((_, i) => (
          <Card key={i} className="shadow-xs">
            <CardContent>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-5 w-24 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-8 w-32 bg-muted animate-pulse rounded" />
                </div>
                <div className="p-2.5 rounded-xl bg-muted animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))
        : cardStats.map((item) => (
          <Card
            key={item.label}
            className="shadow-xs"
          >
            <CardContent className="px-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base text-muted-foreground font-medium">
                    {item.label}
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    <span className={item.color ?? item.color}>
                      <AnimatedCounter key={item.label} end={item.value} currency={item.currency} />{" "}
                      <span className="text-sm font-normal text-muted-foreground">{item.valueOpt}</span>
                    </span>
                  </p>
                </div>

                <div className="bg-sidebar-accent p-2.5 rounded-xl ">
                  <HugeiconsIcon
                    icon={item.icon}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
