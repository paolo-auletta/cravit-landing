"use client"

import { MapPin, Youtube, ExternalLink, Star, Navigation } from "lucide-react"
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
  const isHighTier = numericGrade >= 8

  // Determine grade color intensity based on score
  const getGradeIntensity = () => {
    if (numericGrade >= 9.5) return "from-[#ff6900] via-[#ff8533] to-[#ff5a1f]"
    if (numericGrade >= 9) return "from-[#ff6900] to-[#ff8533]"
    if (numericGrade >= 8.5) return "from-[#ff8533] to-[#ff9f5a]"
    return "from-[#ff9f5a] to-[#ffb380]"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="not-prose my-8"
    >
      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-sand)] dark:bg-[var(--color-dark-1)] shadow-2xl shadow-black/5 dark:shadow-black/30 ring-1 ring-black/5 dark:ring-white/10">
        
        {/* Background Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6900]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#ff6900]/5 rounded-full blur-2xl" />

        {/* Top Premium Indicator */}
        {isTopTier && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400/90 to-amber-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg shadow-amber-500/20">
              <Star className="w-3 h-3 fill-white text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Top Rated</span>
            </div>
          </motion.div>
        )}

        <div className="relative p-6 sm:p-8">
          {/* Main Content Grid */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* HERO RATING - Large, Central, Impossible to Miss */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
              className="relative"
            >
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getGradeIntensity()} blur-xl`}
              />
              
              {/* Rating Badge */}
              <div 
                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br ${getGradeIntensity()} shadow-2xl flex flex-col items-center justify-center overflow-hidden`}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                
                {/* Rating Number - HERO SIZE */}
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="relative text-5xl sm:text-6xl font-black text-white tracking-tighter drop-shadow-lg"
                >
                  {voto}
                </motion.span>
                
                {/* Label */}
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="relative text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-[0.2em] mt-0.5"
                >
                  Voto
                </motion.span>

                {/* Sparkle for high scores */}
                {isHighTier && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-1 -right-1"
                  >
                    <Star className="w-6 h-6 fill-yellow-300 text-yellow-300 drop-shadow-md" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              
              {/* Address Block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center sm:justify-start gap-2 text-[#ff6900]">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Indirizzo</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                  {indirizzo}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col xs:flex-row gap-3 pt-2"
              >
                {/* Google Maps Button */}
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2.5 rounded-xl bg-gray-900 dark:bg-white/10 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 dark:hover:bg-white/15 hover:shadow-lg hover:shadow-black/20"
                >
                  <Navigation className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>

                {/* YouTube Button */}
                {recensione ? (
                  <motion.a
                    href={recensione}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <Youtube className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Video Recensione</span>
                    <ExternalLink className="w-3 h-3 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                ) : (
                  <div className="flex items-center justify-center gap-2.5 rounded-xl bg-gray-200 dark:bg-white/5 px-5 py-3 text-sm font-medium text-gray-400 dark:text-white/40 cursor-not-allowed">
                    <Youtube className="w-4 h-4" />
                    <span>Video non disponibile</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6900]/50 to-transparent" />
      </div>
    </motion.div>
  )
}
