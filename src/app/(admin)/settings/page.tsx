//- src/app/(admin)/settings/page.tsx

import { MaintenancePage } from "@/components/core/maintenance"

const SettingPage = () => {
  const breadcrumbItems = [
    {
      label: "Pengaturan",
    },
  ]
  return <MaintenancePage breadcrumbItems={breadcrumbItems} />
}

export default SettingPage
