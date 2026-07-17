//- app/(admin)/socials/posts/filters.tsx

"use client"

import React from "react"
import { type DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Field } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, CalendarRangeIcon, Check, Trash2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { DateFormatted } from "@/lib/date"

const ClearIcon = Trash2Icon
const ClearLabel = "Hapus"

interface FilterCheckboxProps {
  Icon: React.ElementType,
  title: string,
  data: {
    value: string,
    label: string,
  }[]
  searchable?: boolean,
  isLoading?: boolean,
}
const FilterCheckbox = ({
  Icon,
  title,
  data,
  searchable = false,
  isLoading = false,
}: FilterCheckboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [showClearFilter, setShowClearFilter] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  const handleSelect = (value: string) => {
    const isSelected = selectedValues.includes(value)

    if (isSelected) {
      // 1. Ambil data terbaru setelah dihapus
      const updatedValues = selectedValues.filter((v) => v !== value)
      setSelectedValues(updatedValues)

      // 2. Tombol clear tetap muncul jika masih ada item tersisa
      setShowClearFilter(updatedValues.length > 0)
    } else {
      // Jika menambah data baru
      const updatedValues = [...selectedValues, value]
      setSelectedValues(updatedValues)
      setShowClearFilter(true)
    }
  }

  // Helper to display the currently selected items
  const displaySelected = () => {
    const result = title

    if (selectedValues.length === 0) {
      return (
        <>
          <Icon className="text-muted-foreground" />
          <div className="font-normal text-muted-foreground">{result}</div>
        </>
      )
    }

    const labels = selectedValues
      .map((value) => data.find((s) => s.value === value)?.label)
      .filter((label): label is string => label !== undefined) // Filter out undefined/null

    return (
      <>
        <Icon />
        <div className="flex flex-row gap-2 items-center">
          <div className="font-normal">{result}</div>
          <div className="flex gap-1 pl-1.5">
            {labels.length > 2 ? (
              <Badge variant="secondary" className="text-xs font-normal">{labels.length} selected</Badge>
            ) : (
              labels.map((label) => (
                <Badge variant="secondary" key={label} className="text-xs font-normal">{label}</Badge>
              ))
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="shadow-xs">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between p-0 font-normal"
          disabled={isLoading}
        >
          {displaySelected()}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="min-w-fit w-auto p-0 shadow-xs">
        <Command>
          {searchable && (
            <CommandInput placeholder={`Search ${title}...`} />
          )}
          <CommandList>
            {searchable && (
              <CommandEmpty className="px-4 py-2">
                <span className="text-xs text-muted-foreground font-normal">Data not found</span>
              </CommandEmpty>
            )}
            <CommandGroup>
              {data.map((row) => {
                const isChecked = selectedValues.includes(row.value)
                return (
                  <CommandItem
                    key={row.value}
                    onSelect={() => handleSelect(row.value)}
                    className="flex items-center space-x-1 p-2 cursor-pointer"
                  >
                    <div
                      // Using a simple div or Checkbox component wrapper for alignment
                      className={cn(
                        "flex items-center justify-center h-4 w-4 rounded-[3px] border border-primary transition-colors",
                        isChecked
                          ? "bg-primary text-primary-foreground"
                          : "opacity-15"
                      )}
                    >
                      <Check className={cn("h-4 w-4 text-white", isChecked ? "opacity-100" : "opacity-0")} />
                    </div>
                    <span>{row.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {showClearFilter && (
              <>
                <Separator />
                <CommandGroup>
                  <CommandItem className="cursor-pointer text-xs justify-center">
                    <div
                      className="flex flex-row items-center justify-center gap-1.5 w-full h-full text-muted-foreground"
                      onClick={() => {
                        setSelectedValues([])
                        setOpen(false)
                        setShowClearFilter(false)
                      }}
                    >
                      <ClearIcon />
                      {ClearLabel}
                    </div>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface FilterDateProps {
  title: string,
  disabled?: boolean,
}
const FilterDate = ({ title, disabled = false }: FilterDateProps) => {
  const [date, setDate] = React.useState<Date>()

  return (
    <Field className="mx-auto w-fit">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start px-2.5 font-normal"
            disabled={disabled}
          >
            <CalendarIcon />
            {date ? DateFormatted(date) : <span>{title}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

interface FilterDateRangeProps {
  title: string,
  disabled?: boolean,
}
const FilterDateRange = ({ title, disabled = false }: FilterDateRangeProps) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

  return (
    <Field className="mx-auto w-fit">
      <Popover>
        <PopoverTrigger asChild className="shadow-xs">
          <Button
            type="button"
            variant="outline"
            size="default"
            id="date-picker-range"
            className={cn(
              "justify-start px-2.5 font-normal",
              !dateRange && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <CalendarRangeIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {DateFormatted(dateRange.from)} - {DateFormatted(dateRange.to)}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>{title}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            min={1}
            max={30}
            disabled={{
              after: new Date(),
            }}
          />
          <div className="text-muted-foreground text-center text-xs mb-3">
            Your stay must be between 1 and 30 nights
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}

interface FilterResetProps {
  disabled?: boolean,
}
const FilterReset = ({ disabled = false }: FilterResetProps) => {
  return (
    <Button
      variant="link"
      className="justify-start px-2.5 border-dashed text-muted-foreground text-xs"
      disabled={disabled}
    >
      Hapus Filter
    </Button>
  )
}

export {
  FilterCheckbox,
  FilterDate,
  FilterDateRange,
  FilterReset,
}
