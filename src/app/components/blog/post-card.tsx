"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import type { PostMeta } from "@/types/post"

interface PostCardProps {
  post: PostMeta
  index?: number
  featured?: boolean
}

export function PostCard({ post, index = 0, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group col-span-full"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-sand)]">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Image side */}
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-sand)] opacity-0 lg:opacity-100" />
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--color-dark-1)]/10 bg-white/60 px-2.5 py-1 text-xs font-medium text-[var(--color-dark-1)]/70 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="heading-2 mb-3 transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                  {post.title}
                </h3>

                <p className="body-l mb-6 line-clamp-3 text-[var(--color-dark-1)]/60">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
                      {post.author.avatar && (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-dark-1)]">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-[var(--color-dark-1)]/50">
                        {post.readingTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-dark-1)] text-white transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--color-sand)]">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {/* Hover overlay with arrow */}
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-dark-1)]/0 transition-all duration-300 group-hover:bg-[var(--color-dark-1)]/20">
            <div className="flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5 text-[var(--color-dark-1)]" />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--color-dark-1)]/8 bg-[var(--color-sand)]/50 px-2 py-0.5 text-[11px] font-medium text-[var(--color-dark-1)]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-[var(--color-dark-1)]/40">
              {post.readingTime}
            </span>
          </div>

          <h3 className="text-lg font-medium leading-snug text-[var(--color-dark-1)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
            {post.title}
          </h3>

          <p className="body-s line-clamp-2 text-[var(--color-dark-1)]/50">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-[var(--color-sand)]">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <span className="text-xs font-medium text-[var(--color-dark-1)]/60">
              {post.author.name}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
