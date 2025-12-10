"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Home, Search } from "lucide-react"
import { motion } from "framer-motion"

import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"

export default function BlogPostNotFound() {
  return (
    <main className="flex h-screen flex-col bg-[var(--color-background)] pt-28 sm:pt-32">
      <section className="px-5 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Navbar />
        </div>
      </section>

      <section className="flex flex-1 items-center px-5 sm:px-10 lg:px-24">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Illustration */}
            <div className="relative mx-auto mb-10 w-fit">
              {/* Background glow */}
              <div className="absolute -inset-8 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
              
              {/* Main icon container */}
              <motion.div
                className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-[var(--color-dark-1)]/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <BookOpen className="h-14 w-14 text-[var(--color-dark-1)]/20" />
                
                {/* Question mark badge */}
                <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg">
                  <Search className="h-5 w-5" />
                </div>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -left-12 top-4 rounded-lg border border-[var(--color-dark-1)]/5 bg-white px-3 py-2 shadow-md"
                animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xs font-medium text-[var(--color-dark-1)]/40">Article</span>
              </motion.div>

              <motion.div
                className="absolute -right-14 bottom-2 rounded-lg border border-[var(--color-dark-1)]/5 bg-white px-3 py-2 shadow-md"
                animate={{ y: [0, 6, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-xs font-medium text-[var(--color-dark-1)]/40">Not found</span>
              </motion.div>
            </div>

            {/* Content */}
            <span className="mb-4 inline-flex items-center rounded-full border border-[var(--color-dark-1)]/8 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-dark-1)]/60">
              404 · Blog Post
            </span>

            <h1 className="heading-1 mb-4">Post not found</h1>

            <p className="body-l mx-auto mb-8 max-w-lg text-[var(--color-dark-1)]/60">
              This article seems to have wandered off. It might have been moved, 
              renamed, or maybe it never existed in the first place.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-dark-1)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Blog
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-1)]/10 bg-white px-6 py-3 text-sm font-medium text-[var(--color-dark-1)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </div>

            {/* Suggested action */}
            <div className="mt-12 rounded-2xl border border-[var(--color-dark-1)]/5 bg-[var(--color-sand)]/50 p-6">
              <p className="body-m text-[var(--color-dark-1)]/60">
                Looking for something specific? Check out our{" "}
                <Link href="/blog" className="font-medium text-[var(--color-accent)] hover:underline">
                  latest articles
                </Link>{" "}
                or learn more about{" "}
                <Link href="/" className="font-medium text-[var(--color-accent)] hover:underline">
                  Cravit
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
