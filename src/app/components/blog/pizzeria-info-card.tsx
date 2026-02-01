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

  // Parse grade for color coding
  const numericGrade = parseFloat(voto.replace("+", ".5").replace("–", "."))
  const isTopTier = numericGrade >= 9
  const isHighTier = numericGrade >= 8.5

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="not-prose my-6 overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5"
    >
      {/* Clean Header Row */}
      <div className="flex items-center gap-4 border-b border-[var(--color-dark-1)]/5 px-5 py-4">
        {/* Grade Circle */}
        <div 
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
            isTopTier 
              ? "bg-[#ff6900] shadow-[0_4px_12px_rgba(255,105,0,0.35)]" 
              : isHighTier
              ? "bg-[#ff6900]/90 shadow-[0_4px_10px_rgba(255,105,0,0.25)]"
              : "bg-[var(--color-dark-1)]/70"
          }`}
        >
          {voto}
        </div>
        
        {/* Address */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--color-dark-1)]">
            {indirizzo}
          </p>
          <p className="mt-0.5 text-xs text-[var(--color-dark-1)]/50">
            Voto di Franchino
          </p>
        </div>
      </div>
      
      {/* Action Buttons Row */}
      <div className="flex divide-x divide-[var(--color-dark-1)]/5">
        {/* Maps Button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[var(--color-dark-1)]/80 transition-colors hover:bg-[var(--color-sand)]/50 hover:text-[var(--color-accent)]"
        >
          <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span>Google Maps</span>
          <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
        
        {/* YouTube Button */}
        {recensione ? (
          <a
            href={recensione}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[var(--color-dark-1)]/80 transition-colors hover:bg-[var(--color-sand)]/50 hover:text-[#ff0000]"
          >
            <Youtube className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>Recensione</span>
            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ) : (
          <div className="flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[var(--color-dark-1)]/30">
            <Youtube className="h-4 w-4" />
            <span>Video non disponibile</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
