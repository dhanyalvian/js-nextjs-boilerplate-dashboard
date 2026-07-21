//- src/app/(admin)/manages/recipes/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { ManageRecipeListResp } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellImagePopup,
  CellList,
  imageColumnSize,
} from "@/components/core/data-table/columns"
import { Badge } from "@/components/ui/badge"
import { ChefHatIcon } from "@hugeicons/core-free-icons"

export const Columns: ColumnDef<ManageRecipeListResp>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: imageColumnSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellImagePopup
          src={row.original.image}
          alt={row.original.name}
          title={row.original.name + " | " + row.original.cuisine}
        />
      )
    }
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.name}</div>

          <Badge variant="outline">
            <CellIcon
              icon={ChefHatIcon}
              text={row.original.cuisine}
              className="text-muted-foreground"
            />
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    size: 120,
  },
  {
    accessorKey: "mealType",
    header: "Meal Type",
    size: 160,
    enableSorting: false,
    cell: ({ row }) => <CellList records={row.original.mealType} max={4} />,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 200,
    enableSorting: false,
    cell: ({ row }) => {
      return <CellList records={row.original.tags} max={4} />
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
          pathEdit={`/manages/recipes/edit/${row.original.id}`}
          pathDelete={`/manages/recipes/delete/${row.original.id}`}
        />
      )
    },
  },
]
