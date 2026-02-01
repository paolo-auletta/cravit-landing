"use client"

import { motion } from "framer-motion"
import type { PostMeta } from "@/types/post"

import { PostCard } from "./post-card"

interface PostListProps {
  posts: PostMeta[]
  showFeatured?: boolean
}

export function PostList({ posts, showFeatured = true }: PostListProps) {
  if (posts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-sand)]">
          <svg className="h-10 w-10 text-[var(--color-dark-1)]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-lg text-[var(--color-dark-1)]/50">
          No posts yet. Check back soon!
        </p>
      </motion.div>
    )
  }

  const [featuredPost, ...remainingPosts] = posts
  const displayPosts = showFeatured && posts.length > 1 ? remainingPosts : posts

  return (
    <div className="space-y-12">
      {/* Featured post */}
      {showFeatured && featuredPost && (
        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              Featured Story
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-accent)]/30 to-transparent" />
          </motion.div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Grid of remaining posts */}
      {displayPosts.length > 0 && (
        <section>
          {showFeatured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-dark-1)]/10 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-dark-1)]/40">
                More Stories
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-dark-1)]/10 to-transparent" />
            </motion.div>
          )}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
