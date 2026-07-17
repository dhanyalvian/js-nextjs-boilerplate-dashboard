//- src/components/core/nav-user.tsx

"use client"

import {
  Bell,
  CircleCheck,
  CircleUserRound,
  EllipsisVertical,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getInitials } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ApiInternal } from "@/lib/api"
import { useQueries } from "@tanstack/react-query"
import { toast } from "sonner"
import Link from "next/link"

interface userLoggedResp {
  id: number,
  email: string,
  firstname: string,
  lastname: string,
  avatar: string,
}

const getUserLogged = async (): Promise<userLoggedResp> => {
  const data = await ApiInternal("/auth/me")
  return data.record
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    toast.success("Anda berhasil keluar")
    router.replace("/login")
  }

  const queries = useQueries({
    queries: [{
      queryKey: ["user", "logged"],
      queryFn: () => getUserLogged(),
      refetchOnWindowFocus: false,
    }],
  })
  const [queryUserLogged] = queries
  const avatar = queryUserLogged.data?.avatar ?? ""
  const email = queryUserLogged.data?.email ?? ""
  const firstname = queryUserLogged.data?.firstname ?? ""
  const lastname = queryUserLogged.data?.lastname ?? ""
  const fullname = lastname ? firstname + " " + lastname : firstname

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={avatar} alt={fullname} />
                <AvatarFallback className="rounded-full">{getInitials(fullname)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullname}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={avatar} alt={fullname} />
                  <AvatarFallback className="rounded-full">{getInitials(fullname)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullname}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/accounts/profiles">
                <DropdownMenuItem>
                  <CircleUserRound />
                  Profil
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CircleCheck />
                Akun
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifikasi
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
