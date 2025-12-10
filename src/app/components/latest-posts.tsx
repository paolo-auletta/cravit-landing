"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import type { PostMeta } from "@/types/post"

import { PostCard } from "./blog/post-card"

interface LatestPostsProps {
  posts: PostMeta[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="px-5 py-20 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="inline-block rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-accent)]">
              Blog
            </span>
            <h2 className="heading-2 mt-4">Latest Insights</h2>
          </div>
          <Link
            href="/blog"
            className="group hidden items-center gap-2 text-sm font-medium text-[var(--color-dark-1)]/70 transition-colors hover:text-[var(--color-accent)] sm:flex"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sand)] px-6 py-3 text-sm font-medium text-[var(--color-dark-1)] transition-colors hover:bg-[var(--color-sand-2)]"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
