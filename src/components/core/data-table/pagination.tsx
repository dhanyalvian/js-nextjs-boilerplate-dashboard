//- components/core/data-table/pagination.tsx

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { NumberFormatted } from "@/lib/number"
import { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
} from "@hugeicons/core-free-icons"



interface PaginationProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  limit: number,
  totalRecords: number,
  totalPages: number,
  currentPage: number,
  setPage: (page: number) => void,
  isLoading?: boolean,
}

export const strokeWidth = 2
export const Pagination = <TData, TValue>({
  columns,
  limit,
  totalRecords,
  totalPages,
  currentPage,
  setPage,
  isLoading = false,
}: PaginationProps<TData, TValue>) => {
  const startRow = totalRecords ? ((currentPage - 1) * limit + 1) : 0
  const endRow = Math.min(currentPage * limit, totalRecords)

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={columns.length}>
          <div className="w-full flex items-center justify-between pl-2 pr-2">
            <div className="flex space-x-2 items-center">
              <div className="text-xs font-normal">
                Page <span className="font-semibold">{NumberFormatted(currentPage)}</span>{` `}
                of <span className="font-semibold">{NumberFormatted(totalPages)}</span>
              </div>
              <div className="text-xs text-border">|</div>
              <div className="text-xs font-normal">
                <span className="font-semibold">{NumberFormatted(startRow)}-{NumberFormatted(endRow)}</span>{` `}
                of <span className="font-semibold">{NumberFormatted(totalRecords)}</span> records
              </div>
            </div>

            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    title="First"
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(1)}
                    disabled={isLoading || currentPage === 1}
                    className="rounded-md text-xs"
                  >
                    <HugeiconsIcon icon={ChevronFirstIcon} strokeWidth={strokeWidth} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  First Page
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    title="Previous"
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(currentPage - 1)}
                    disabled={isLoading || currentPage === 1}
                    className="rounded-md text-xs"
                  >
                    {/* <ChevronLeft /> */}
                    <HugeiconsIcon icon={ChevronLeftIcon} strokeWidth={strokeWidth} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Previous Page
                </TooltipContent>
              </Tooltip>

              {renderPages({
                totalPages,
                currentPage,
                setPage,
              })}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    title="Next"
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(currentPage + 1)}
                    disabled={isLoading || currentPage === totalPages}
                    className="rounded-md text-xs"
                  >
                    <HugeiconsIcon icon={ChevronRightIcon} strokeWidth={strokeWidth} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Next Page
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    title="Last"
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(totalPages)}
                    disabled={isLoading || currentPage === totalPages}
                    className="rounded-md text-xs"
                  >
                    <HugeiconsIcon icon={ChevronLastIcon} strokeWidth={strokeWidth} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Last Page
                </TooltipContent>
              </Tooltip>
            </ButtonGroup>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

interface renderPagesProps {
  totalPages: number,
  currentPage: number,
  setPage: (page: number) => void,
}
const renderPages = ({
  totalPages,
  currentPage,
  setPage,
}: renderPagesProps) => {
  const pages: (number | string)[] = []

  // Always show first page
  pages.push(1)

  let start = Math.max(2, currentPage - 2)
  let end = Math.min(totalPages - 1, currentPage + 2)

  // Keep exactly 5 pages visible
  if (end - start < 4) {
    if (currentPage <= 3) {
      end = Math.min(totalPages - 1, 5)
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 4)
    }
  }

  // Ellipsis on the left
  if (start > 2) {
    pages.push("...")
  }

  // Middle range
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Ellipsis on the right
  if (end < totalPages - 1) {
    pages.push("...")
  }

  // Always show last page if more than 1
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages.map((page, index) =>
    page === "..." ? (
      <Button
        aria-label="Hidden pages"
        key={`dots-${index}`}
        variant="outline"
        size="sm"
        className="text-xs"
        disabled={true}
      >
        <HugeiconsIcon icon={EllipsisIcon} strokeWidth={strokeWidth} />
      </Button>
    ) : (
      <Button
        key={page}
        variant="outline"
        size="sm"
        className={`text-xs ${currentPage === page ? "bg-neutral-200 text-black font-bold" : ""}`}
        onClick={() => setPage(page as number)}
        disabled={currentPage === page}
      >
        {totalPages ? page : 0}
      </Button>
    )
  )
}
