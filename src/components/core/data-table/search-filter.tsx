//- components/core/data-table/search-filter.tsx

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"
import { FilterReset } from "./filters"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons"

const StrokeWidth = 2

interface SearchProps {
  placeholder?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void,
  onReset?: () => void,
  isLoading?: boolean,
  filters?: React.ReactNode,
  addHref?: string,
}

export const SearchFilters = ({
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  onReset,
  isLoading,
  filters,
}: SearchProps) => {
  return (
    <div className="flex gap-2">
      <InputGroup className="w-80 bg-white rounded-md shadow-xs">
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={StrokeWidth} />
        </InputGroupAddon>
        {value ? (
          <InputGroupAddon align="inline-end" onClick={onClear}>
            {isLoading ? (
              <Spinner />
            ) : (
              <HugeiconsIcon
                icon={Cancel01Icon}
                strokeWidth={StrokeWidth}
                className="cursor-pointer hover:text-foreground"
              />
            )}
          </InputGroupAddon>
        ) : isLoading ? (
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        ) : null}
      </InputGroup>

      {filters && (
        <>
          {filters}

          <FilterReset disabled={isLoading} onClick={onReset} />
        </>
      )}
    </div>
  )
}

interface ActionProps {
  title?: string,
  addHref?: string,
}
export const Actions = ({ title, addHref = "" }: ActionProps) => {
  const router = useRouter()
  const handleAddAction = (href: string) => {
    if (href != "") {
      router.push(href)
    }
  }

  return (
    <ButtonGroup>
      <Button
        onClick={() => handleAddAction(addHref)}
        variant="default"
        size="default"
        className="rounded-md shadow-xs"
      >
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={StrokeWidth} />
        New {title && title}
      </Button>
    </ButtonGroup>
  )
}
