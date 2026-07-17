//- src/app/(admin)/accounts/profiles/page.tsx

import { MaintenancePage } from "@/components/core/maintenance"

export default function ProfilesMaintenancePage() {
  const breadcrumbItems = [
    {
      label: "Profil",
    },
  ]
  
  return <MaintenancePage breadcrumbItems={breadcrumbItems} />
}
