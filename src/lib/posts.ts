import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

import type { Post, PostMeta } from "@/types/post"

const POSTS_PATH = path.join(process.cwd(), "src/content/blog")

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return []
  }
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  const frontmatter = {
    featured: false,
    ...(data as Post),
  }

  if (!frontmatter.published) {
    return null
  }

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: readingTime(content).text,
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null

      // Return metadata only (no content)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post
      return meta as PostMeta
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getLatestPosts(count: number = 3): PostMeta[] {
  return getAllPosts().slice(0, count)
}
