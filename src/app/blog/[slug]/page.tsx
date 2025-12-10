import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getPostBySlug, getPostSlugs } from "@/lib/posts"

import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"
import { BlogWaitlist, MDXContent, ReadingProgressBar } from "../../components/blog"
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const ogImage = post.coverImage || "/icon.png"

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: "Cravit",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: "@cravitapp",
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        publishedTime={post.date}
        authorName={post.author.name}
        image={post.coverImage}
        url={`/blog/${slug}`}
        tags={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />
      <main className="min-h-screen bg-[var(--color-background)] pt-28 sm:pt-32">
        <ReadingProgressBar />

        <section className="px-5 sm:px-10 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <Navbar />
          </div>
        </section>

        {/* Hero section with cover image */}
        <section className="relative px-5 pb-6 sm:px-10 lg:px-24">
          <div className="mx-auto max-w-6xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-dark-1)]/60 transition-colors hover:text-[var(--color-accent)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Cover image */}
            {post.coverImage && (
              <div className="relative aspect-[21/9] overflow-hidden rounded-3xl bg-[var(--color-sand)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-[var(--color-dark-1)]/5 sm:aspect-[2.5/1]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* Title and tags section */}
        <section className="px-5 pb-6 sm:px-10 lg:px-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[var(--color-dark-1)]/10 bg-white/60 px-2.5 py-1 text-xs font-medium text-[var(--color-dark-1)]/70 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="heading-1">{post.title}</h1>
          </div>
        </section>

        {/* Article content */}
        <article className="px-5 pb-20 sm:px-10 lg:px-24">
          <div className="mx-auto max-w-3xl">
            {/* Author and meta info */}
            <div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-[var(--color-dark-1)]/50">
              <div className="flex items-center gap-2">
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
                <span className="font-medium text-[var(--color-dark-1)]/70">
                  {post.author.name}
                </span>
              </div>
              <span className="text-[var(--color-dark-1)]/20">·</span>
              <span>{formattedDate}</span>
              <span className="text-[var(--color-dark-1)]/20">·</span>
              <span>{post.readingTime}</span>
            </div>

            {/* Content */}
            <div className="prose-wrapper">
              <MDXContent source={post.content} />
            </div>

            {/* Waitlist CTA */}
            <BlogWaitlist />
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}
