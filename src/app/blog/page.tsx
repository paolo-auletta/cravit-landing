import type { Metadata } from "next"

import { getAllPosts } from "@/lib/posts"

import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { BlogHero, PostCard, PostList } from "../components/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, tutorials, and the latest news from the Cravit team. Discover restaurant recommendations, food journaling tips, and updates about our app.",
  keywords: [
    "Cravit blog",
    "food blog",
    "restaurant tips",
    "food journaling tips",
    "restaurant recommendations",
    "foodie blog",
  ],
  openGraph: {
    title: "Blog | Cravit",
    description:
      "Tips, tutorials, and the latest news from the Cravit team. Discover restaurant recommendations and food journaling tips.",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Cravit Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Cravit",
    description:
      "Tips, tutorials, and the latest news from the Cravit team.",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-28 sm:pt-32">
      <section className="px-5 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Navbar />
        </div>
      </section>

      <section className="px-5 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <BlogHero />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Featured section */}
          {featuredPosts.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-dark-1)]/40">
                  Featured
                </h2>
                <div className="mt-2 h-px bg-[var(--color-dark-1)]/10" />
              </div>
              <div className="grid gap-6">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} featured />
                ))}
              </div>
            </div>
          )}

          {/* All posts section */}
          {regularPosts.length > 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--color-dark-1)]/40">
                  All Posts
                </h2>
                <div className="mt-2 h-px bg-[var(--color-dark-1)]/10" />
              </div>
              <PostList posts={regularPosts} showFeatured={false} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
