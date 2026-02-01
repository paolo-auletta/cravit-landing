"use client"

import { motion } from "framer-motion"
import { Sparkles, PenLine, ArrowDown } from "lucide-react"

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-12">
      {/* Animated decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[var(--color-accent)]/10 via-[var(--color-accent)]/5 to-transparent blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-32 h-48 w-48 rounded-full bg-[var(--color-accent)]/10 blur-[80px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-32 top-48 h-56 w-56 rounded-full bg-[var(--color-sand)] blur-[80px]" 
        />
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute h-2 w-2 rounded-full bg-[var(--color-accent)]"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 15}%`
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-gradient-to-r from-[var(--color-accent)]/10 via-[var(--color-accent)]/5 to-transparent px-5 py-2.5 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-dark-1)]">
              Stories & Insights
            </span>
            <PenLine className="h-3.5 w-3.5 text-[var(--color-accent)]/60" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.1] tracking-tight text-[var(--color-dark-1)] sm:text-6xl lg:text-7xl"
          >
            The Cravit{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
                Chronicle
              </span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-dark-1)]/70 sm:text-xl"
          >
            Stories, discoveries, and culinary adventures from the team building 
            a more <span className="text-[var(--color-accent)]">personal</span> way to explore food.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-[var(--color-dark-1)]/40"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Scroll to explore</span>
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
