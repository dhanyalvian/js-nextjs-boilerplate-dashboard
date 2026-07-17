//- src/app/(admin)/helps/page.tsx

import { MaintenancePage } from "@/components/core/maintenance"

const HelpPage = () => {
  const breadcrumbItems = [
    {
      label: "Bantuan",
    },
  ]
  return <MaintenancePage breadcrumbItems={breadcrumbItems} />
}

export default HelpPage
