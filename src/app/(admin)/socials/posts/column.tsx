//- src/app/(admin)/transactions/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { SocialPostListResp } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellList,
} from "@/components/core/data-table/columns"
import { NumberFormatted } from "@/lib/number"
import { Badge } from "@/components/ui/badge"
import { ThumbsDown, ThumbsUp } from "@hugeicons/core-free-icons"

export const Columns: ColumnDef<SocialPostListResp>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 360,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.title}</div>
          <Badge variant="outline" className="text-muted-foreground">
            {NumberFormatted(row.original.views)} views
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "body",
    header: "Body",
    size: 0,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 180,
    enableSorting: false,
    cell: ({ row }) => {
      return <CellList records={row.original.tags} max={3} />
    },
  },
  {
    accessorKey: "reactions",
    header: "Reactions",
    size: 100,
    enableSorting: false,
    cell: ({ row }) => {
      const likes = NumberFormatted(row.original.likes)
      const dislikes = NumberFormatted(row.original.dislikes)

      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline">
            <CellIcon icon={ThumbsUp} text={likes} />
          </Badge>
          <Badge variant="outline">
            <CellIcon
              icon={ThumbsDown}
              text={dislikes}
              className="text-muted-foreground"
            />
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
