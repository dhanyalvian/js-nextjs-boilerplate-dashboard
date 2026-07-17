//- src/app/(admin)/page.tsx

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { ChartAreaInteractive } from "@/components/sections/dashboard/chart-area-interactive"
import { LatestProjects } from "@/components/sections/dashboard/latest-projects"
import { SectionCards } from "@/components/sections/dashboard/section-cards"

const breadcrumbItems = [
  {
    label: "Dashboard",
  },
]

const DashboardPage = () => {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <div className="grid gap-4 pt-0">
          <SectionCards />

          <ChartAreaInteractive />

          <LatestProjects />
        </div>
      </AppMain>
    </>
  )
}

export default DashboardPage
