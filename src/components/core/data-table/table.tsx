//- components/core/data-table/table.tsx

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import React, { JSX } from "react"
import { Pagination } from "./pagination"
import { Table } from "@/components/ui/table"
import { Actions, SearchFilters } from "./search-filter"
import { Thead } from "./thead"
import { Tbody } from "./tbody"
import { DateRangeFilterFn } from "./function"

export interface DataTableProps<TData, TValue> {
  title: string,
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  isLoading?: boolean,
  limit: number,
  totalRows: number,
  page: number,
  setPage: (page: number) => void,
  searchPlaceholder?: string,
  search: string,
  setSearch: (value: string) => void,
  filters?: JSX.Element,
  addHref?: string,
}

export const DataTable = <TData, TValue>({
  title,
  columns,
  data,
  isLoading = false,
  limit,
  totalRows,
  page,
  setPage,
  searchPlaceholder = "Search...",
  search = "",
  setSearch,
  filters,
  addHref = "",
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility] = React.useState<VisibilityState>({})
  const totalPages = Math.ceil(totalRows / limit)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }
  const handleSearchClear = () => {
    setSearch("")
    setPage(1)
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data,
    columns: columns,
    defaultColumn: {
      minSize: 5,
      size: 100,
      maxSize: 500,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    pageCount: totalPages,
    manualFiltering: true,
    filterFns: {
      dateBetween: DateRangeFilterFn,
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-between items-center">
        <SearchFilters
          placeholder={searchPlaceholder}
          value={search}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          isLoading={isLoading}
          filters={filters}
        />

        <Actions title={title} addHref={addHref} />
      </div>

      <div className="bg-white rounded-md border shadow-xs">
        <Table>
          <Thead table={table} />

          <Tbody table={table} columns={columns} isLoading={isLoading} />

          <Pagination
            columns={columns}
            limit={limit}
            totalRecords={totalRows}
            totalPages={totalPages}
            currentPage={page}
            setPage={setPage}
            isLoading={isLoading}
          />
        </Table>
      </div>
    </div>
  )
}
