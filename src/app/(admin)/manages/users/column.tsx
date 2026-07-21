//- src/app/(admin)/manages/users/column.tsx

import { ColumnDef } from "@tanstack/react-table"
import { ManageUserListResp } from "./type"
import {
  actionColHeader,
  actionColKey,
  actionColSize,
  CellActions,
  CellIcon,
  CellImage,
  imageColumnSize,
} from "@/components/core/data-table/columns"
import { Badge } from "@/components/ui/badge"
import {
  Call02Icon,
  Mail01Icon,
  ManIcon,
  WomanIcon,
} from "@hugeicons/core-free-icons"

export const Columns: ColumnDef<ManageUserListResp>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    size: imageColumnSize,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <CellImage
          src={row.original.avatar}
          alt={row.original.firstname}
        />
      )
    }
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 0,
    cell: ({ row }) => {
      let fullname = row.original.firstname
      if (row.original.lastname) {
        fullname += ' ' + row.original.lastname
      }

      return (
        <div>{fullname}</div>
      )
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    size: 120,
    cell: ({ row }) => {
      const gender = row.original.gender
      const genderText = gender === "M" ? "Male" : "Female"
      const genderVariant = gender === "M" ? "secondary" : "outline"
      return (
        <Badge variant={genderVariant} className="capitalize">
          {genderText}
        </Badge>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Contacts",
    size: 320,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <CellIcon
            icon={Mail01Icon}
            text={row.original.email}
          />
          <CellIcon
            icon={Call02Icon}
            text={row.original.phone}
            className="text-muted-foreground"
          />
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
          pathEdit={`/manages/recipes/edit/${row.original.id}`}
          pathDelete={`/manages/recipes/delete/${row.original.id}`}
        />
      )
    },
  },
]
