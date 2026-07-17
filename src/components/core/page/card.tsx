//- src/components/core/card/form.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import { ReactNode, Suspense } from "react"
import { AppFooter } from "../app-layout"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { UseFormRegisterReturn } from "react-hook-form"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useState } from "react"
import { AppConfig } from "@/lib/app"
import { HugeiconsIcon } from "@hugeicons/react"
import { GalleryVerticalEndIcon } from "@hugeicons/core-free-icons"

interface PageCardProps {
  title: string,
  description: string,
  children: ReactNode,
}
const PageCard = ({
  title,
  description,
  children,
}: PageCardProps) => {
  return (
    <div className="bg-main flex min-h-svh flex-col items-center justify-center gap-4 p-4 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex items-center gap-3 self-center">
          <div>
            <HugeiconsIcon
              icon={GalleryVerticalEndIcon}
              // color="#6C5656"
              strokeWidth={2}
              className="size-5.5! text-chart-3"
            />
          </div>
          <span className="text-xl font-semibold">
            {AppConfig.appName}
          </span>
        </div>

        <Card className="py-0 pt-4 rounded-md shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>

          <Suspense>
            {children}
          </Suspense>
        </Card>
      </div>

      <AppFooter />
    </div>
  )
}

interface PageCardContentProps {
  className?: string,
  children?: ReactNode,
}
const PageCardContent = ({ className, children }: PageCardContentProps) => {
  return (
    <CardContent className={cn("p-4", className)}>
      <FieldGroup className="gap-4">
        {children}
      </FieldGroup>
    </CardContent>
  )
}

interface PageCardContentFieldTextProps {
  id: string,
  label: string,
  type: "text" | "email",
  placeholder?: string,
  className?: string,
  errMessage?: string,
  optLink?: string,
  optLabel?: string,
  registration?: UseFormRegisterReturn,
  isLoading?: boolean,
}
const PageCardContentFieldText = ({
  id,
  label,
  type,
  placeholder = "",
  className,
  errMessage = "",
  optLink = "",
  optLabel = "",
  registration,
  isLoading = false,
}: PageCardContentFieldTextProps) => {
  return (
    <Field className="gap-2">
      <div className="flex items-center">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {optLink && (
          <Link
            href={optLink}
            className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            {optLabel}
          </Link>
        )}
      </div>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={isLoading}
        className={cn(
          "rounded-md",
          errMessage ? "border-red-500" : "",
          className,
        )}
        {...registration}
      />
      {errMessage && (
        <p className="text-sm text-red-500">{errMessage}</p>
      )}
    </Field>
  )
}

interface PageCardContentFieldPasswordProps {
  id: string,
  label: string,
  placeholder?: string,
  className?: string,
  errMessage?: string,
  optLink?: string,
  optLabel?: string,
  registration?: UseFormRegisterReturn,
  isLoading?: boolean,
}
const PageCardContentFieldPassword = ({
  id,
  label,
  placeholder = "",
  className,
  errMessage = "",
  optLink = "",
  optLabel = "",
  registration,
  isLoading = false,
}: PageCardContentFieldPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field className="gap-2">
      <div className="flex items-center">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {optLink && (
          <Link
            href={optLink}
            className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            {optLabel}
          </Link>
        )}
      </div>

      <InputGroup className="relative">
        <InputGroupInput
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            "rounded-md",
            errMessage ? "border-red-500" : "",
            className,
          )}
          {...registration}
        />
        <InputGroupAddon align={null}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full pr-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {errMessage && (
        <FieldDescription className="text-sm text-red-500">
          {errMessage}
        </FieldDescription>
      )}
    </Field>
  )
}

interface PageCardFooterProps {
  submitLabel: string,
  isLoading: boolean,
  children?: ReactNode,
}
const PageCardFooter = ({
  submitLabel,
  isLoading,
  children,
}: PageCardFooterProps) => {
  return (
    <CardFooter className="flex-col gap-2 bg-emerald-50/50 border-t p-4">
      <Button
        type="submit"
        className="w-full rounded-md"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoaderCircleIcon className="animate-spin" />
            Proses...
          </>
        ) : submitLabel}
      </Button>

      {children && (
        <Field>
          <FieldDescription className="text-center">
            {children}
          </FieldDescription>
        </Field>
      )}
    </CardFooter>
  )
}

export {
  PageCard,
  PageCardContent,
  PageCardContentFieldText,
  PageCardContentFieldPassword,
  PageCardFooter,
}
