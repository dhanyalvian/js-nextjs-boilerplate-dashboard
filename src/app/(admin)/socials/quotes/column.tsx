//- src/app/(admin)/socials/quotes/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { SocialQuoteListResp } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
} from "@/components/core/data-table/columns"

export const Columns: ColumnDef<SocialQuoteListResp>[] = [
  {
    accessorKey: "quote",
    header: "Quote",
    size: 0,
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 300,
  },
  {
    accessorKey: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellActions
          pathEdit={`/socials/quotes/edit/${row.original.id}`}
          pathDelete={`/socials/quotes/delete/${row.original.id}`}
        />
      )
    },
  },
]
