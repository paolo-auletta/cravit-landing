# Blog Section Implementation

## Backend / Content Layer
- [x] Install MDX dependencies (`@next/mdx`, `@mdx-js/react`, `gray-matter`, `next-mdx-remote`)
- [x] Create `src/content/blog/` folder for MDX posts
- [x] Create post utilities (`src/lib/posts.ts`) with `getAllPosts` and `getPostBySlug`
- [x] Define TypeScript types for post frontmatter (`src/types/post.ts`
- [x] Add a sample MDX post with frontmatter (title, slug, date, excerpt, tags, coverImage)

## Frontend / Pages
- [x] Create `/blog` route (`src/app/blog/page.tsx`) — listing page
- [x] Create `/blog/[slug]` route (`src/app/blog/[slug]/page.tsx`) — single post page
- [x] Generate static params for all posts (`generateStaticParams`)
- [x] Add SEO metadata generation per post (`generateMetadata`)

## Components
- [x] `PostCard` — card for blog listing grid
- [x] `PostList` — grid/masonry wrapper for cards
- [x] `BlogHero` — hero section for `/blog` page
- [x] `MDXContent` — renderer for MDX with custom components
- [x] `ReadingProgressBar` — scroll progress indicator for post pages
- [x] `AuthorCard` — author info at bottom of posts
- [x] Update `BlogNavbar` link to point to `/blog`

## Styling & Design
- [x] Add blog-specific CSS variables if needed (using existing design system)
- [x] Style post typography (headings, paragraphs, code blocks, blockquotes)
- [x] Responsive grid for post cards
- [x] Framer Motion animations for list items

## Homepage Integration
- [x] Add "Latest Posts" section to homepage pulling recent posts

## Optional Enhancements
- [ ] Tag/category filtering on `/blog`
- [ ] Search functionality
- [ ] RSS feed generation
- [x] Reading time calculation (already implemented in `getPostBySlug`)
