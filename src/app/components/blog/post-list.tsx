"use client"

import type { PostMeta } from "@/types/post"

import { PostCard } from "./post-card"

interface PostListProps {
  posts: PostMeta[]
  showFeatured?: boolean
}

export function PostList({ posts, showFeatured = true }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="body-l text-[var(--color-dark-1)]/50">
          No posts yet. Check back soon!
        </p>
      </div>
    )
  }

  const [featuredPost, ...remainingPosts] = posts
  const displayPosts = showFeatured && posts.length > 1 ? remainingPosts : posts

  return (
    <div className="space-y-10">
      {/* Featured post */}
      {showFeatured && featuredPost && (
        <PostCard post={featuredPost} featured />
      )}

      {/* Grid of remaining posts */}
      {displayPosts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
