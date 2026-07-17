"use client"

import {
  CircleCheckBigIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const iconSize = "size-4.5"

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckBigIcon className={`${iconSize}`} />,
        info: <InfoIcon className={`${iconSize}`} />,
        warning: <TriangleAlertIcon className={`${iconSize}`} />,
        error: <OctagonXIcon className={`${iconSize}`} />,
        loading: <Loader2Icon className={`${iconSize} animate-spin`} />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "oklch(0.596 0.145 163.225)",
          "--success-text": "white",
          "--success-border": "oklch(0.508 0.118 165.612)",
          "--info-bg": "oklch(0.979 0.021 166.113)",
          "--info-text": "oklch(0.307 0.077 163.788)",
          "--info-border": "oklch(0.905 0.093 164.15)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
