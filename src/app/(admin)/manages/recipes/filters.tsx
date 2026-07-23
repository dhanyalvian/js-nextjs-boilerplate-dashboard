//- src/app/(admin)/manages/recipes/filters.tsx

import { FilterCheckbox } from "@/components/core/data-table/filters"
import { LeftToRightListNumberIcon } from "@hugeicons/core-free-icons"

export interface FiltersProps {
  isLoading: boolean,
}
export const Filters = ({ isLoading }: FiltersProps) => {
  return (
    <>
      {FilterCheckbox({
        Icon: LeftToRightListNumberIcon,
        title: "Difficulty",
        data: [
          { value: "Easy", label: "Easy" },
          { value: "Medium", label: "Medium" },
          { value: "Hard", label: "Hard" },
        ],
        isLoading: isLoading,
      })}
    </>
  )
}
