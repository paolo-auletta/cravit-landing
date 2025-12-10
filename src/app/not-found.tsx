"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Home, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col bg-[var(--color-background)] pt-28 sm:pt-32">
      <section className="px-5 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Navbar />
        </div>
      </section>

      <section className="flex flex-1 items-center px-5 sm:px-10 lg:px-24">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-flex items-center rounded-full border border-[var(--color-dark-1)]/8 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-dark-1)]/60">
                404 Error
              </span>

              <h1 className="heading-hero mb-4">
                Oops, wrong
                <br />
                <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#FF8534] bg-clip-text text-transparent">
                  turn!
                </span>
              </h1>

              <p className="body-l mb-8 max-w-md text-[var(--color-dark-1)]/60">
                Looks like this page got lost on the way to the restaurant. 
                Let&apos;s get you back on track to discover your next favorite spot.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-dark-1)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent)]"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-1)]/10 bg-white px-6 py-3 text-sm font-medium text-[var(--color-dark-1)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Visit Blog
                </Link>
              </div>
            </motion.div>

            {/* Right side - Illustration */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative mx-auto w-full max-w-sm">
                {/* Background blur */}
                <div className="absolute -inset-10 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
                
                {/* Main card */}
                <div className="relative overflow-hidden rounded-3xl border border-[var(--color-dark-1)]/5 bg-white/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-sand)]">
                      <MapPin className="h-10 w-10 text-[var(--color-accent)]" />
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-center">
                    <p className="text-6xl font-bold text-[var(--color-dark-1)]">404</p>
                    <p className="text-sm text-[var(--color-dark-1)]/50">Page not found</p>
                  </div>

                  {/* Decorative elements */}
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]/50" />
                    <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]/25" />
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -left-6 top-10 rounded-xl border border-[var(--color-dark-1)]/5 bg-white p-3 shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-2xl">🍕</span>
                </motion.div>
                
                <motion.div
                  className="absolute -right-4 bottom-20 rounded-xl border border-[var(--color-dark-1)]/5 bg-white p-3 shadow-lg"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="text-2xl">🍔</span>
                </motion.div>

                <motion.div
                  className="absolute -right-8 top-4 rounded-xl border border-[var(--color-dark-1)]/5 bg-white p-3 shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="text-2xl">🥗</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
