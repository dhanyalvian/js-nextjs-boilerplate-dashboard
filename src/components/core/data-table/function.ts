//- src/components/core/data-table/function.ts

import { FilterFn, Row } from "@tanstack/react-table"

export const DateRangeFilterFn: FilterFn<Row<unknown>> = (row, columnId, value) => {
  const date = new Date(row.getValue(columnId))
  const [start, end] = value

  if ((!start || !end) && !value) {
    return true
  }

  if (start && !end) {
    return date.getTime() >= start.getTime()
  }

  if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
  }

  return true
}
