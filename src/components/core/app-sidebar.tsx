//- components/core/app-sidebar.tsx

"use client"

import * as React from "react"
import { NavMain } from "@/components/core/nav-main"
import { NavUser } from "@/components/core/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"
import { dataNav } from "@/data/nav"
import Link from "next/link"
import { AppConfig } from "@/lib/app"
import { HugeiconsIcon } from "@hugeicons/react"
import { GalleryVerticalEndIcon } from "@hugeicons/core-free-icons"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!" asChild>
              <Link href="/" aria-label="Dashboard">
                <HugeiconsIcon
                  icon={GalleryVerticalEndIcon}
                  strokeWidth={2}
                  className="size-5.5! text-chart-3"
                />
                <span className="text-base font-semibold mt-0.5">{AppConfig.appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <NavMain menus={dataNav.navMain} />
        <NavSecondary menus={dataNav.navSecondary} className="mt-auto" />
      </SidebarContent>
      
      <SidebarFooter className="bg-white">
        <NavUser />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
