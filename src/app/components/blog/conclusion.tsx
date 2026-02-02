"use client"

import { motion } from "framer-motion"
import { Download, MapPin, ArrowRight, Utensils } from "lucide-react"
import Link from "next/link"

interface ZoneLink {
  name: string
  slug: string
  highlight?: string
}

interface ConclusionProps {
  title?: string
  summary?: string
  otherZones?: ZoneLink[]
}

export function Conclusion({
  title = "Crea la Tua Cravy",
  summary = "Questa guida è solo l'inizio del tuo viaggio. Ogni pizza racconta una storia, ogni quartiere ha i suoi tesori nascosti. Con Cravit puoi trasformare ogni scoperta in una missione personale.",
  otherZones = [
    { name: "Roma Sud", slug: "/blog/pizzerie-roma-sud", highlight: "Marconi, Garbatella, Ostia" },
    { name: "Roma Nord", slug: "/blog/pizzerie-roma-nord", highlight: "Tufello, Trieste, Prati" },
    { name: "Roma Est", slug: "/blog/pizzerie-roma-est", highlight: "Centocella, Tuscolano" },
    { name: "Roma Ovest", slug: "/blog/pizzerie-roma-ovest-centro", highlight: "Monteverde, Centro" },
  ]
}: ConclusionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="not-prose my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-sand)] via-white to-[var(--color-sand)]/50 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5 md:p-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/10 px-4 py-2">
          <Utensils className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-sm font-medium text-[var(--color-accent)]">La tua prossima avventura</span>
        </div>
        <h2 className="text-3xl font-bold text-[var(--color-dark-1)] md:text-4xl">
          {title}
        </h2>
      </motion.div>

      {/* Summary */}
      <motion.div
        variants={itemVariants}
        className="mb-10 text-center"
      >
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--color-dark-1)]/70">
          {summary}
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={itemVariants}
        className="mb-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--color-dark-1)]/5 md:p-8"
      >
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-[var(--color-dark-1)]">
              Trasforma ogni scoperta in una missione
            </h3>
            <p className="text-[var(--color-dark-1)]/60">
              Salva le pizzerie, traccia le tue visite, lascia i tuoi voti
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-shadow hover:shadow-xl hover:shadow-[var(--color-accent)]/30"
          >
            <Download className="h-5 w-5" />
            Scarica l'app Cravit
          </motion.button>
        </div>
      </motion.div>

      {/* Other Zones */}
      <motion.div variants={itemVariants}>
        <h3 className="mb-6 text-center text-lg font-semibold text-[var(--color-dark-1)]">
          Scopri le altre zone di Roma
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherZones.map((zone, index) => (
            <motion.div
              key={zone.slug}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href={zone.slug}
                className="group flex h-full flex-col justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-[var(--color-dark-1)]/5 transition-all hover:shadow-md hover:ring-[var(--color-accent)]/20"
              >
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sand)]">
                      <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                    </div>
                    <span className="font-semibold text-[var(--color-dark-1)] group-hover:text-[var(--color-accent)]">
                      {zone.name}
                    </span>
                  </div>
                  {zone.highlight && (
                    <p className="text-sm text-[var(--color-dark-1)]/50">
                      {zone.highlight}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                  <span>Esplora</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Quote */}
      <motion.div
        variants={itemVariants}
        className="mt-10 text-center"
      >
        <p className="text-lg font-medium italic text-[var(--color-dark-1)]/60">
          "La pizza migliore è quella che ti sorprende, quella che ti fa tornare, quella che diventa la tua."
        </p>
        <p className="mt-2 text-sm text-[var(--color-dark-1)]/40">
          — Franchino Er Criminale
        </p>
      </motion.div>
    </motion.section>
  )
}
