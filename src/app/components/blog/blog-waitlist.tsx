"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/app/components/waitlist-modal"

export function BlogWaitlist() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section
        id="waitlist"
        className="mt-16 scroll-mt-32 rounded-2xl border border-[var(--color-dark-1)]/5 bg-gradient-to-br from-[var(--color-sand)]/80 to-[var(--color-background)] p-8 sm:p-10"
      >
        <div className="mx-auto max-w-md text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-[var(--color-dark-1)]/8 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-dark-1)]/60">
            Early Access
          </span>
          
          <h3 className="heading-3 mb-3">Join the Waitlist</h3>
          
          <p className="body-m mb-6 text-[var(--color-dark-1)]/60">
            Be the first to know when Cravit launches on the App Store. No spam, just launch updates.
          </p>

          <Button
            variant="heroLarge"
            className="group"
            onClick={() => setIsModalOpen(true)}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Join Waitlist
          </Button>
        </div>
      </section>

      <WaitlistModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
