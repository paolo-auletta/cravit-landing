"use client"

import { MapPin, Youtube, ExternalLink, Star } from "lucide-react"
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

  // Parse grade for styling
  const numericGrade = parseFloat(voto.replace("+", ".5").replace("–", "."))
  const isTopTier = numericGrade >= 9
  const isHighTier = numericGrade >= 8.5

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="not-prose my-8"
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl ring-1 ring-gray-100">
        {/* Top Accent Bar */}
        <div className={`h-1.5 w-full ${isTopTier ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'}`} />
        
        <div className="p-6">
          {/* Header: Rating + Address */}
          <div className="flex items-start gap-5">
            {/* Rating Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className={`relative flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl text-white shadow-lg ${
                isTopTier 
                  ? "bg-gradient-to-br from-orange-500 to-red-500 shadow-orange-500/30" 
                  : "bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-400/30"
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider opacity-90">Voto</span>
              <span className="text-3xl font-black">{voto}</span>
              {isTopTier && (
                <Star className="absolute -right-1 -top-1 h-5 w-5 fill-yellow-300 text-yellow-300" />
              )}
            </motion.div>
            
            {/* Address Block */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Indirizzo</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-gray-900 leading-tight">
                {indirizzo}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* Maps Button */}
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg"
            >
              <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Google Maps</span>
              <ExternalLink className="h-3 w-3 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </motion.a>
            
            {/* YouTube Button */}
            {recensione ? (
              <motion.a
                href={recensione}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20"
              >
                <Youtube className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Video Recensione</span>
                <ExternalLink className="h-3 w-3 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
              </motion.a>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 py-3 text-sm font-medium text-gray-400">
                <Youtube className="h-4 w-4" />
                <span>Video non disponibile</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>
    </motion.div>
  )
}
