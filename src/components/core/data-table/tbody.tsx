//- components/core/data-table/tbody.tsx

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

interface TbodyProps<TData, TValue> {
  table: Table<TData>,
  columns: ColumnDef<TData, TValue>[],
  isLoading?: boolean,
}

export const Tbody = <TData, TValue>({
  table,
  columns,
  isLoading,
}: TbodyProps<TData, TValue>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className="hover:bg-muted/50"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="first:pl-4 last:pr-4 text-sm align-top whitespace-normal wrap-break-word">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext(),
                )}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : isLoading ? (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <Button variant="outline" disabled size="sm">
                <Spinner />
                <span className="font-normal">Memuat data...</span>
              </Button>
            </div>

          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >
            Data tidak ditemukan.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
