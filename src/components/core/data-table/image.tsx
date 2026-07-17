//- src/components/core/data-table/image.tsx

"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ZoomIn } from "lucide-react"

interface ImagePopupProps {
  src: string,
  alt?: string,
  title?: string,
}

export function ImagePopup({ src, alt = "Image", title }: ImagePopupProps) {
  return (
    <Dialog>
      {/* Trigger: Gambar kecil yang bisa diklik */}
      <DialogTrigger asChild>
        <div className="relative group cursor-zoom-in overflow-hidden rounded-lg border w-fit">
          <Image
            src={src}
            alt={alt}
            width={200}
            height={150}
            className="border border-sidebar-border rounded-xl w-18 h-18 object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn className="text-white h-6 w-6" />
          </div>
        </div>
      </DialogTrigger>

      {/* Konten Popup */}
      <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{title || alt}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-auto flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
          />
        </div>
        {title && (
          <p className="text-center text-white mt-2 text-sm font-medium">
            {title}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}