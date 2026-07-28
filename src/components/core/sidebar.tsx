//- src/components/core/sidebar.tsx

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "@hugeicons/core-free-icons"

export const NewSidebarTrigger = () => {
  const { open } = useSidebar()
  
  return (
    <SidebarTrigger className="[&>svg]:hidden">
      <HugeiconsIcon
        icon={open ? PanelLeftOpenIcon : PanelLeftCloseIcon}
        strokeWidth={1.5}
        className="size-5!"
      />
    </SidebarTrigger>
  )
}
