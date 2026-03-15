"use client"

import { MapPin, Play } from "lucide-react"

interface PizzeriaInfoCardProps {
  nome: string
  voto: string
  indirizzo: string
  mapsUrl?: string
  recensione?: string
}

function isUrl(str: string) {
  return str.startsWith("http://") || str.startsWith("https://")
}

export function PizzeriaInfoCard({ nome, voto, indirizzo, mapsUrl, recensione }: PizzeriaInfoCardProps) {
  if (!nome || !voto || !indirizzo) {
    return null
  }

  const googleMapsUrl =
    mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(indirizzo)}`

  const hasVideo = recensione && isUrl(recensione)
  const hasTextReview = recensione && !isUrl(recensione)

  return (
    <div className="not-prose my-10">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#F2EFEB] dark:border-white/10 bg-[var(--color-background)] dark:bg-[var(--color-dark-2)] shadow-[0_0px_40px_rgba(18,17,17,0.02)] dark:shadow-black/20">
        {/* Orange accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-[linear-gradient(180deg,#ff8e43_0%,#ff6900_55%,#f64900_100%)]" />

        {/* ── Mobile: Design A (stacked with text links) ── */}
        <div className="flex items-start gap-4 py-4 pl-6 pr-5 md:hidden">
          {/* Grade bubble — mobile */}
          <div className="-mt-1 shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[linear-gradient(180deg,#ff8e43_0%,#ff6900_55%,#f64900_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.5),inset_0_10px_18px_rgba(255,255,255,0.35),0_8px_16px_-4px_rgba(255,105,0,0.3)]">
            <div className="flex flex-col items-center">
              <span className="text-[24px] font-black leading-none tracking-tight text-white drop-shadow-sm">
                {voto}
              </span>
              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/80 mt-1">
                Voto
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-base font-semibold leading-snug text-[var(--color-dark-1)] dark:text-white/90">
              {nome}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-[var(--color-dark-1)]/50 dark:text-white/40">
              {indirizzo}
            </p>
            {hasTextReview && (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-dark-1)]/40 dark:text-white/30">
                {recensione}
              </p>
            )}
            <div className="flex items-center gap-4 mt-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-accent)] transition-opacity hover:opacity-70"
              >
                <MapPin className="w-3.5 h-3.5" />
                Maps
              </a>
              {hasVideo && (
                <a
                  href={recensione}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-red-500 transition-opacity hover:opacity-70"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Video
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Desktop: Design C (bigger, actions right) ── */}
        <div className="hidden md:flex items-center gap-5 py-5 pl-8 pr-6">
          {/* Grade bubble — desktop (bigger) */}
          <div className="shrink-0 flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[linear-gradient(180deg,#ff8e43_0%,#ff6900_55%,#f64900_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.5),inset_0_10px_18px_rgba(255,255,255,0.35),0_8px_16px_-4px_rgba(255,105,0,0.3)]">
            <div className="flex flex-col items-center">
              <span className="text-[34px] lg:text-[42px] font-black leading-none tracking-tight text-white drop-shadow-sm">
                {voto}
              </span>
              <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 mt-1">
                Voto
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold leading-snug text-[var(--color-dark-1)] dark:text-white/90">
              {nome}
            </p>
            <p className="mt-0.5 text-[15px] leading-snug text-[var(--color-dark-1)]/50 dark:text-white/40">
              {indirizzo}
            </p>
            {hasTextReview && (
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-dark-1)]/40 dark:text-white/30">
                {recensione}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-dark-1)]/5 dark:bg-white/10 text-[var(--color-dark-1)]/50 dark:text-white/50 transition-colors hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
              title="Apri in Maps"
            >
              <MapPin className="w-[18px] h-[18px]" />
            </a>
            {hasVideo && (
              <a
                href={recensione}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/5 dark:bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/15 hover:text-red-500"
                title="Video Recensione"
              >
                <Play className="w-4 h-4 fill-current" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
