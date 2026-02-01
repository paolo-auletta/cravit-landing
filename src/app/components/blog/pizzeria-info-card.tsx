"use client"

import { MapPin, Youtube, Star, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface PizzeriaInfoCardProps {
  voto: string
  indirizzo: string
  mapsUrl?: string
  recensione?: string
}

export function PizzeriaInfoCard({ voto, indirizzo, mapsUrl, recensione }: PizzeriaInfoCardProps) {
  // Generate Google Maps URL from address if not provided
  const googleMapsUrl = mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(indirizzo)}`

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  } as const

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants as any}
      className="not-prose my-8 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-[var(--color-dark-1)]/5"
    >
      {/* Voto Header - Top section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/90 p-5 text-white">
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-black/10 blur-xl"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Valutazione Finale</h3>
            <div className="mt-1.5 flex items-baseline gap-2">
              <p className="text-4xl font-bold">{voto}</p>
              <div className="flex items-center gap-1 text-white/90">
                <Star className="h-4 w-4" fill="currentColor" />
                <span className="text-sm font-medium">/ 10</span>
              </div>
            </div>
          </div>
          
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 shadow-lg backdrop-blur-md"
          >
            <Star className="h-8 w-8" fill="white" strokeWidth={0} />
          </motion.div>
        </div>
        
        {/* Simple address preview */}
        <p className="mt-3 text-sm text-white/80">
          {indirizzo.length > 50 ? indirizzo.substring(0, 50) + '...' : indirizzo}
        </p>
      </div>
      
      {/* Info buttons row */}
      <div className="grid grid-cols-2 gap-4 p-5">
        {/* Maps Button */}
        <motion.a
          variants={itemVariants as any}
          whileHover={{ y: -4 }}
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl bg-[var(--color-sand)]/50 p-4 transition-all hover:bg-[var(--color-sand)]/80"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-dark-1)]/60">Trova su</p>
            <p className="flex items-center gap-1 text-sm font-bold text-[var(--color-dark-1)]">
              Google Maps
              <ExternalLink className="h-3 w-3 text-[var(--color-dark-1)]/50" />
            </p>
          </div>
        </motion.a>
        
        {/* YouTube Button */}
        {recensione ? (
          <motion.a
            variants={itemVariants as any}
            whileHover={{ y: -4 }}
            href={recensione}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl bg-[var(--color-sand)]/50 p-4 transition-all hover:bg-[var(--color-sand)]/80"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ff0000]/10 text-[#ff0000]">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-dark-1)]/60">Guarda su</p>
              <p className="flex items-center gap-1 text-sm font-bold text-[var(--color-dark-1)]">
                YouTube
                <ExternalLink className="h-3 w-3 text-[var(--color-dark-1)]/50" />
              </p>
            </div>
          </motion.a>
        ) : (
          <motion.div
            variants={itemVariants as any}
            className="flex items-center gap-4 rounded-xl bg-[var(--color-sand)]/30 p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-dark-1)]/5 text-[var(--color-dark-1)]/30">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-dark-1)]/40">Video</p>
              <p className="text-sm font-bold text-[var(--color-dark-1)]/40">
                Non disponibile
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Footer with subtle hint */}
      <div className="border-t border-[var(--color-dark-1)]/5 px-5 py-3">
        <p className="text-center text-xs text-[var(--color-dark-1)]/40">
          Recensione da <span className="font-medium text-[var(--color-accent)]">Cravit</span>, la tua guida per la pizza a Roma
        </p>
      </div>
    </motion.div>
  )
}
