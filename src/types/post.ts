export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  excerpt: string
  tags: string[]
  coverImage: string
  author: {
    name: string
    avatar: string
  }
  published: boolean
  featured?: boolean
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: string
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string
}
