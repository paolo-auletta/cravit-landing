"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/", showOnDesktop: false },
  { label: "Blog", href: "/blog" },
  { label: "Feedback", href: "https://cravit.featurebase.app/" },
]

const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/products/cravit?utm_source=badge-featured&utm_medium=badge"

export function Navbar() {
  const [activeLink, setActiveLink] = useState("Blog")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return

      const currentY = window.scrollY

      if (isMenuOpen) {
        setIsNavHidden(false)
        lastScrollY.current = currentY
        return
      }

      if (currentY < 80) {
        setIsNavHidden(false)
      } else if (currentY > lastScrollY.current + 6) {
        setIsNavHidden(true)
      } else if (currentY < lastScrollY.current - 6) {
        setIsNavHidden(false)
      }

      lastScrollY.current = currentY
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  const desktopLinks = NAV_LINKS.filter((link) => link.showOnDesktop !== false)
  const mobileLinks = NAV_LINKS

  const handleNavSelect = (label: string) => {
    setActiveLink(label)
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={false}
      animate={
        isNavHidden
          ? { y: -120, opacity: 0, pointerEvents: "none" }
          : { y: 0, opacity: 1, pointerEvents: "auto" }
      }
      transition={{ duration: 0.33, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
    >
      <div className="mx-auto w-full max-w-6xl space-y-3">
        <div className="hidden items-center justify-between rounded-[72px] bg-[var(--color-sand)]/95 px-[18px] py-2.5 shadow-[0px_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-[12px] sm:flex">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/icon.png"
                alt="Cravit icon"
                width={28}
                height={28}
                className="rounded-[10px]"
                priority
                />
              </Link>
          </div>

          <div className="flex items-center">
            <nav aria-label="Primary" className="flex items-center gap-5">
              {desktopLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "nav-link transition-colors duration-200",
                    activeLink === link.label
                      ? "text-[var(--color-dark-1)] opacity-100"
                      : "text-[var(--color-dark-1)]/75 hover:opacity-90",
                  )}
                  aria-current={activeLink === link.label ? "page" : undefined}
                  onClick={() => handleNavSelect(link.label)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="ml-5">
              <a
                href={PRODUCT_HUNT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-[var(--color-dark-3)] hover:bg-[var(--color-dark-1)] px-5 py-1.5 text-sm font-medium text-white shadow-[0_16px_32px_rgba(18,17,17,0.25)] transition-all hover:translate-y-[-1px] hover:bg-black/90"
              >
                Product Hunt
              </a>
            </div>
          </div>
        </div>

        <div className="sm:hidden">
          <div className="rounded-[22px] bg-[var(--color-sand)]/95 px-5 py-2.5 shadow-[0px_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-[10px] transition-all">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image
                  src="/icon.png"
                  alt="Cravit icon"
                  width={34}
                  height={34}
                  className="rounded-[10px]"
                  priority
                />
              </Link>
              
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="relative h-10 w-10 rounded-full border border-transparent transition-all hover:border-[rgba(18,17,17,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-dark-1)]"
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-[30%] h-0.5 w-6 -translate-x-1/2 rounded-full bg-[var(--color-dark-1)] transition-all duration-200",
                    isMenuOpen && "top-1/2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[var(--color-dark-1)] transition-all duration-200",
                    isMenuOpen && "scale-x-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-[70%] h-0.5 w-6 -translate-x-1/2 rounded-full bg-[var(--color-dark-1)] transition-all duration-200",
                    isMenuOpen && "top-1/2 -rotate-45",
                  )}
                />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                  className="mt-4"
                >
                  <div className="h-px w-full bg-[var(--color-sand-2)]" />
                  <div className="flex flex-col px-1 py-[22px]">
                    <nav aria-label="Mobile primary" className="flex flex-col gap-3">
                      {mobileLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={cn(
                            "heading-3 text-left leading-tight transition-colors duration-200",
                            activeLink === link.label
                              ? "text-[var(--color-dark-1)]"
                              : "text-[color-mix(in_srgb,var(--color-dark-1)_75%,transparent)] hover:text-[var(--color-dark-1)]",
                          )}
                          onClick={() => handleNavSelect(link.label)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-[22px] flex flex-col gap-[22px]">
                      <a
                        href={PRODUCT_HUNT_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-[18px] bg-[var(--color-dark-3)] px-4 py-3 text-xl font-medium text-white shadow-[0_16px_32px_rgba(18,17,17,0.25)] transition-all hover:translate-y-[-1px] hover:bg-black/90"
                      >
                        Product Hunt
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
