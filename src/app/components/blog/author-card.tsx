import Image from "next/image"

interface AuthorCardProps {
  author: {
    name: string
    avatar: string
  }
  date: string
  readingTime: string
}

export function AuthorCard({ author, date, readingTime }: AuthorCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex items-center gap-4 border-t border-[var(--color-dark-1)]/10 pt-8">
      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[var(--color-sand)]">
        {author.avatar && (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div>
        <p className="font-medium text-[var(--color-dark-1)]">{author.name}</p>
        <p className="text-sm text-[var(--color-dark-1)]/50">
          {formattedDate} · {readingTime}
        </p>
      </div>
    </div>
  )
}
