//- src/components/sections/dashboard/latest-projects.tsx

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyFormatted } from "@/lib/currency";
import { DateTimeFormatted } from "@/lib/date";
import { CircleCheckBigIcon, ClockFadingIcon } from "lucide-react";
import Link from "next/link";

export function LatestProjects() {
  const Cards = [
    {
      uid: "rcppheklw97wpy0gydif4",
      name: "Metro City Library",
      description: "Construction of a new 3-story public library with digital archives and community spaces",
      budget: 85000000,
      createdAt: "2026-05-24T04:35:59.982Z",
      isCompleted: false,
    },
    {
      uid: "hcy9a3vmf2ww4z6f1vnah",
      name: "Green Valley Residential Complex",
      description: "Development of 50 sustainable housing units with green spaces and energy-efficient designs",
      budget: 250000000,
      createdAt: "2026-05-24T04:35:59.982Z",
      isCompleted: false,
    },
    {
      uid: "l2awj49vfz3fmbrjznszh",
      name: "Downtown Commercial Tower",
      description: "15-story office building with modern amenities and smart building technology",
      budget: 320000000,
      createdAt: "2026-05-24T04:35:59.982Z",
      isCompleted: true,
    },
    {
      uid: "mzhd9bpblsxx8rnsqtvyn",
      name: "Riverside Park Revitalization",
      description: "Renovation of 5 acres of riverside park including trails, playgrounds, and seating areas",
      budget: 45000000,
      createdAt: "2026-05-24T04:35:59.982Z",
      isCompleted: true,
    },
  ]

  return (
    <div className="*:data-[slot=card]:bg-white *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Cards.map((card) => (
        <Card className="@container/card gap-2 py-0 pt-4" key={card.uid}>
          <CardHeader>
            <CardAction>
              {card.isCompleted ? (
                <Badge variant="secondary">
                  <CircleCheckBigIcon data-icon="inline-start" />
                  Selesai
                </Badge>
              ) : (
                <Badge variant="outline">
                  <ClockFadingIcon data-icon="inline-start" />
                  Aktif
                </Badge>
              )}
            </CardAction>
            <CardTitle>
              {card.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4">
            <CardDescription>
              {card.description}
            </CardDescription>

            <div className="pt-6">
              <div className="text-sm">Total Anggaran</div>
              <div className="text-xl font-semibold">
                {CurrencyFormatted(Number(card.budget))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-emerald-50/50 border-t px-4 py-2">
            <div className="grid grid-cols-3 w-full">
              <div className="col-span-2 text-muted-foreground text-sm align-text-bottom">
                {DateTimeFormatted(card.createdAt)}
              </div>
              <div className="text-right align-text-bottom">
                <Link
                  href={`/projects/${card.uid}`}
                  className="text-sm text-slate-500 font-semibold hover:underline"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))
      }
    </div >
  )
}
