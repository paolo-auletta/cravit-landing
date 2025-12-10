"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function BlogWaitlist() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  return (
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

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">
            <Check className="h-5 w-5" />
            <span className="font-medium">You&apos;re on the list!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-[var(--color-dark-1)]/10 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--color-dark-1)]/40 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
              required
            />
            <Button
              type="submit"
              variant="heroLarge"
              disabled={status === "loading"}
              className="group shrink-0"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    </section>
  )
}
