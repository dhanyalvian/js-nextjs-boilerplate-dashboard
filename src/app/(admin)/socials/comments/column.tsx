//- src/app/(admin)/socials/comments/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { SocialCommentListResp } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
} from "@/components/core/data-table/columns"
import { NumberFormatted } from "@/lib/number"
import { Badge } from "@/components/ui/badge"

export const Columns: ColumnDef<SocialCommentListResp>[] = [
  {
    accessorKey: "body",
    header: "Comment",
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.body}</div>
          <Badge variant="outline" className="text-muted-foreground">
            {NumberFormatted(row.original.likes)} likes
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellActions
          pathEdit={`/socials/posts/edit/${row.original.id}`}
          pathDelete={`/socials/posts/delete/${row.original.id}`}
        />
      )
    },
  },
]
