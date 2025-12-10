"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-4 sm:pb-16 sm:pt-8">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[var(--color-accent)]/8 to-transparent blur-[80px]" />
        <div className="absolute -left-20 top-20 h-32 w-32 rounded-full bg-[var(--color-accent)]/5 blur-[60px]" />
        <div className="absolute -right-20 top-40 h-40 w-40 rounded-full bg-[var(--color-sand)]/80 blur-[60px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-dark-1)]">
              Stories & Insights
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-1"
          >
            The Cravit{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
                Blog
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-l mx-auto mt-5 max-w-lg text-balance"
          >
            Stories, updates, and ideas from the team building a more personal way to discover food.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
