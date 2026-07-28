//- src/app/(admin)/manages/products/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { ManageProductListResp } from "./type"
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
import { PackageReceive01Icon, PackageRemove01Icon, PackageSent01Icon } from "@hugeicons/core-free-icons"
import { NumberFormatted } from "@/lib/number"

export const Columns: ColumnDef<ManageProductListResp>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    size: imageColumnSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellImagePopup
          src={row.original.thumbnail}
          alt={row.original.name}
          title={row.original.name}
        />
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 0,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div>{row.original.name}</div>
          <Badge variant="outline" className="text-muted-foreground">
            SKU: {row.original.sku}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    size: 200,
    cell: ({ row }) => {
      return (
        <div>{row.original.brand || "-"}</div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
    cell: ({ row }) => <div className="capitalize">{row.original.category}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 130,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div>
          <span>$</span>
          {NumberFormatted(row.original.price)}
        </div>
      )
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    size: 130,
    enableSorting: false,
    cell: ({ row }) => {
      const stock = row.original.stock
      let iconStock = PackageSent01Icon
      let classStock = ""
      let classBorder = ""

      if (stock < 1) {
        iconStock = PackageRemove01Icon
        classStock = "text-neutral-400"
        classBorder = "border-neutral-200"
      } else if (stock < 10) {
        iconStock = PackageReceive01Icon
        classStock = "text-red-600"
        classBorder = "border-red-200"
      } else {
        classStock = "text-blue-600"
        classBorder = "border-blue-200"
      }

      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className={classBorder}>
            <CellIcon
              icon={iconStock}
              text={NumberFormatted(stock)}
              className={classStock}
            />
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 200,
    enableSorting: false,
    cell: ({ row }) => <CellList records={row.original.tags} max={4} />,
  },
  {
    accessorKey: actionColKey,
    header: actionColHeader,
    size: actionColSize,
    enableSorting: false,
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <CellActions
          pathEdit={`/manages/products/edit/${id}`}
          pathDelete={`/manages/products/delete/${id}`}
        />
      )
    },
  },
]
