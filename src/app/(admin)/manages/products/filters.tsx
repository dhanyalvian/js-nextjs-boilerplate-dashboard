//- src/app/(admin)/manages/products/filters.tsx

import {
  FilterCheckbox,
  FilterDateRange,
} from "@/components/core/data-table/filters"
import { SaleTag02Icon } from "@hugeicons/core-free-icons"

export interface FiltersProps {
  isLoading: boolean,
}
export const Filters = ({ isLoading }: FiltersProps) => {
  return (
    <>
      {FilterDateRange({
        title: "Date",
        disabled: isLoading,
      })}
      {FilterCheckbox({
        Icon: SaleTag02Icon,
        title: "Brand",
        data: [
          { value: "DentaCare", label: "DentaCare" },
          { value: "GamePro", label: "GamePro" },
          { value: "BreezeWear", label: "BreezeWear" },
          { value: "WildlifeWatch", label: "WildlifeWatch" },
          { value: "International Business Machines", label: "International Business Machines (IBM)" },
          { value: "Minnesota Mining and Manufacturing Company", label: "Minnesota Mining and Manufacturing Company (3M)" },
        ],
        isLoading: isLoading,
      })}
    </>
  )
}
