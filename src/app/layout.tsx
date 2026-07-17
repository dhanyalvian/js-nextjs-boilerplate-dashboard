//- src/app/layout.tsx

import type { Metadata } from "next"
import { Roboto_Flex, Roboto_Mono } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from "./provider"
import { Toaster } from "@/components/ui/sonner"
import { AppConfig } from "@/lib/app"

const fontSans = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
})

const fontMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: AppConfig.appName,
  description: AppConfig.appDesc,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ReactQueryProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "group font-sans border-2",
                success: "!bg-slate-50 !text-slate-600 !border-slate-200",
                error: "!bg-slate-50 !text-red-500 !border-red-100",
                loading: "!bg-slate-50 !text-slate-700 !border-slate-200",
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
