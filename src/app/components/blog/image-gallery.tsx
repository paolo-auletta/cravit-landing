"use client"

import Image from "next/image"

interface GalleryImage {
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  layout?: "grid" | "masonry" | "featured"
}

export function ImageGallery({ images, layout = "featured" }: ImageGalleryProps) {
  if (images.length === 0) return null

  // Featured layout: first image large, rest in a grid below
  if (layout === "featured" && images.length >= 3) {
    const [featured, ...rest] = images
    return (
      <div className="not-prose my-8 space-y-3">
        {/* Featured large image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--color-sand)] shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-[var(--color-dark-1)]/5">
          <Image
            src={featured.src}
            alt={featured.alt}
            fill
            className="object-cover"
          />
        </div>
        {/* Grid of remaining images */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {rest.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-sand)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Simple grid layout
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-sand)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
