//- components/core/maintenance.tsx

"use client"

import { AppHeader, AppMain } from "@/components/core/app-layout"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { WrenchIcon, ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

interface MaintenancePageProps {
  breadcrumbItems?: { label: string; href?: string }[]
}

export const MaintenancePage = ({ breadcrumbItems }: MaintenancePageProps) => {
  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <div className="flex items-center justify-center h-full">
          <Card className="w-full h-full text-center p-6 shadow-xs">
            <CardHeader className="max-w-md w-screen mx-auto">
              <div className="flex items-center align-middle justify-center mb-3">
                <WrenchIcon className="h-12 w-12 text-yellow-500 animate-pulse" />
              </div>
              <CardTitle className="text-2xl font-bold">We’ll be back soon!</CardTitle>
              <CardDescription className="text-gray-500 mt-2">
                Our site is currently down for maintenance. We’re working hard to get things back up.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-md w-screen mx-auto space-y-4 mt-4">
              <Alert>
                <AlertTitle>Estimated Downtime</AlertTitle>
                <AlertDescription>
                  The system should be back online within a few hours. Thank you for your patience.
                </AlertDescription>
              </Alert>

              <Button
                className="mt-6"
                asChild
              >
                <Link href="/">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Kembali ke halaman utama
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppMain>
    </>
  )
}
