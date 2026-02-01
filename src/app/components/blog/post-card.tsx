"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Bookmark } from "lucide-react"

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
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group col-span-full"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-sand)] transition-shadow duration-500 hover:shadow-2xl hover:shadow-[var(--color-accent)]/10">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Image side */}
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[450px]">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-sand)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:opacity-100" />
                
                {/* Featured badge */}
                <div className="absolute left-4 top-4 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white shadow-lg">
                  Featured
                </div>
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="rounded-lg border border-[var(--color-dark-1)]/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-[var(--color-dark-1)]/70 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white group-hover:text-[var(--color-accent)]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-[var(--color-dark-1)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-3xl">
                  {post.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-base leading-relaxed text-[var(--color-dark-1)]/60">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
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
                      <p className="text-sm font-semibold text-[var(--color-dark-1)]">
                        {post.author.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-dark-1)]/50">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-dark-1)] text-white transition-all duration-300 group-hover:bg-[var(--color-accent)]"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.div>
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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-[var(--color-sand)] transition-all duration-500 hover:shadow-xl hover:shadow-[var(--color-accent)]/5">
          {/* Image container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-1)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Hover arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              >
                <ArrowUpRight className="h-6 w-6 text-[var(--color-dark-1)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.div>
            </div>

            {/* Bookmark icon */}
            <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--color-dark-1)]/8 bg-[var(--color-sand)] px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-[var(--color-dark-1)]/60 transition-colors duration-200 group-hover:border-[var(--color-accent)]/20 group-hover:text-[var(--color-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--color-dark-1)]/40">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </div>
            </div>

            <h3 className="mb-2 text-lg font-semibold leading-snug text-[var(--color-dark-1)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
              {post.title}
            </h3>

            <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-dark-1)]/50">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-2.5 border-t border-[var(--color-dark-1)]/5 pt-4">
              <div className="relative h-7 w-7 overflow-hidden rounded-full bg-[var(--color-sand)] ring-2 ring-white">
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
        </div>
      </Link>
    </motion.article>
  )
}
