//- components/core/data-table/thead.tsx

import { flexRender, Table } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TheadProps<TData> {
  table: Table<TData>,
}

export const Thead = <TData,>({ table }: TheadProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                className="first:pl-4 last:pr-4 text-md"
                style={header.getSize() > 5 ? { width: `${header.getSize()}px` } : undefined}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
