//- components/core/data-table/columns.tsx

import Link from "next/link"
import Image from "next/image"
// import { EllipsisVertical, SquarePen, Star, Trash2, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { Delete02Icon, EllipsisVerticalIcon, PencilEdit02Icon, SearchAddIcon, StarIcon } from "@hugeicons/core-free-icons"

export const imageColumnSize = 110

export const ratingColumnHeader = "Rating"
export const ratingColumnSize = 80

export const actionColKey = "action"
export const actionColHeader = ""
export const actionColSize = 60
export const actionColEditSize = 90
export const actionColDelSize = actionColSize

export const iconSize = 16
export const imageWidth = 72
export const imageHeight = 72

interface CellImageProps {
  src: string
  alt: string
}
export const CellImage = ({ src, alt }: CellImageProps) => {
  if (src == "") {
    // src = "/images/default.jpg"
    src = "/images/thumbnail-default.png"
  }

  return (
    <Image
      priority={true}
      src={src}
      alt={alt}
      className="object-cover border border-sidebar-border rounded-xl w-18 h-18"
      width={imageWidth}
      height={imageHeight}
      unoptimized
    />
  )
}

interface CellImagePopupProps {
  src: string,
  alt?: string,
  title?: string,
}
export const CellImagePopup = ({
  src,
  alt = "Image",
  title,
}: CellImagePopupProps) => {
  if (src == "") {
    src = "/images/thumbnail-default.png"
    return <CellImage src={src} alt={alt} />
  }

  return (
    <Dialog>
      {/* Trigger: Gambar kecil yang bisa diklik */}
      <DialogTrigger asChild>
        <div className="relative group cursor-zoom-in overflow-hidden rounded-xl w-fit">
          <CellImage src={src} alt={alt} />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {/* <ZoomIn className="text-white h-6 w-6" /> */}
            <HugeiconsIcon
              icon={SearchAddIcon}
              strokeWidth={2}
              className="text-white h-6 w-6"
            />
          </div>
        </div>
      </DialogTrigger>

      {/* Konten Popup */}
      <DialogContent className="max-w-[95vw] w-fit border-none bg-transparent p-0 shadow-none outline-none flex flex-1 items-center justify-center">
        <DialogHeader className="sr-only">
          <DialogTitle>{title || alt}</DialogTitle>
          <DialogDescription>
            Tampilan penuh dari gambar bukti transaksi.
          </DialogDescription>
        </DialogHeader>

        <div className="h-full w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="h-auto max-h-[90vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />

          {title && (
            <p className="text-center text-white mt-2 text-sm font-medium">
              {title}
            </p>
          )}
        </div>

        {/* <div className="relative w-75 h-50 flex items-center justify-center">
          <Image
            priority={true}
            src={src}
            alt={alt}
            className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
            unoptimized
            onError={() => console.error("Gagal load gambar di popup:", src)}
            // style={imageStyle}
            fill
          />
        </div> */}

      </DialogContent>
    </Dialog>
  )
}

interface CellIconProps {
  icon: IconSvgElement,
  iconSize?: number,
  text: string | number,
  className?: string,
}
export const CellIcon = ({ icon, iconSize = 15, text, className }: CellIconProps) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <HugeiconsIcon
        icon={icon}
        strokeWidth={1.5}
        size={iconSize}
      />
      <span>{text}</span>
    </div>
  )
}

interface CellListProps {
  records: string[],
  max?: number,
}
export const CellList = ({ records, max }: CellListProps) => {
  const displayed = max ? (records ?? []).slice(0, max) : (records ?? [])

  return (
    <ul className="list-disc ml-4 pl-0.5">
      {displayed.map((item, idx) => (
        <li key={idx} className="capitalize">{item}</li>
      ))}
    </ul>
  )
}

interface CellRatingProps {
  rating: number,
  className?: string,
}
export const CellRating = ({ rating, className }: CellRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* <Star size={iconSize} className="text-yellow-400" fill="gold" /> */}
      <HugeiconsIcon
        icon={StarIcon}
        size={iconSize}
        strokeWidth={2}
        className="text-yellow-400"
      />
      <span>{rating}</span>
    </div>
  )
}

interface ActionProps {
  path: string
}
export const ActionEdit = ({ path }: ActionProps) => {
  return (
    <Link title="Edit" href={path} className="group hover:text-sky-600">
      <div className="table-icon-td">
        {/* <SquarePen size={iconSize} /> */}
        <HugeiconsIcon
          icon={PencilEdit02Icon}
          size={iconSize}
          strokeWidth={2}
        />
        <span className="group-hover:underline">Edit</span>
      </div>
    </Link>
  )
}

export const ActionDelete = ({ path }: ActionProps) => {
  return (
    <Link title="Delete" href={path}>
      <Button variant="outline" size="sm" className="rounded-full text-xs">
        <HugeiconsIcon
          icon={Delete02Icon}
          size={iconSize}
          strokeWidth={2}
        />
        Delete
      </Button>
    </Link>
  )
}

interface ActionsProps {
  pathEdit: string
  pathDelete: string
}
export const CellActions = ({ pathEdit, pathDelete }: ActionsProps) => {
  return (
    <div className="w-full text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Actions" variant="ghost" size="sm">
            <HugeiconsIcon icon={EllipsisVerticalIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={pathEdit} title="Edit">
                <HugeiconsIcon
                  icon={PencilEdit02Icon}
                  size={iconSize}
                  strokeWidth={2}
                />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={pathDelete} title="Delete">
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={iconSize}
                  strokeWidth={2}
                />
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
