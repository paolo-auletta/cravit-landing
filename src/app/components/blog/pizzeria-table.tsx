"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, PizzaIcon, Squircle, Star } from "lucide-react"

interface PizzeriaData {
  pizzeria: string
  quartiere: string
  votoPizza: string
  votoSuppli: string
  votoServizio: string
  votoFinale: string
}

// Parse grade string to number for sorting (handles "9+", "8.5", "—", etc.)
function parseGrade(grade: string): number {
  if (grade === "—" || grade === "-") return -1
  const cleaned = grade.replace("+", ".5").replace("–", ".")
  const num = parseFloat(cleaned)
  return isNaN(num) ? -1 : num
}

// Sort data by column
function sortData(
  data: PizzeriaData[],
  sortKey: "votoFinale" | "quartiere" | null,
  sortDirection: "asc" | "desc"
): PizzeriaData[] {
  if (!sortKey) return data

  return [...data].sort((a, b) => {
    if (sortKey === "votoFinale") {
      const aVal = parseGrade(a.votoFinale)
      const bVal = parseGrade(b.votoFinale)
      return sortDirection === "desc" ? bVal - aVal : aVal - bVal
    }
    if (sortKey === "quartiere") {
      const comparison = a.quartiere.localeCompare(b.quartiere)
      return sortDirection === "desc" ? -comparison : comparison
    }
    return 0
  })
}

// Grade pill component for criteria grades
function GradePill({ value }: { value: string }) {
  if (value === "—" || value === "-") {
    return (
      <span className="text-[var(--color-dark-1)]/30">—</span>
    )
  }
  
  const numValue = parseGrade(value)
  
  // Color based on grade value
  let bgColor = "bg-[#ffeee6]"
  let textColor = "text-[#ff6900]"
  
  if (numValue >= 4) {
    bgColor = "bg-[#ff6900]/15"
    textColor = "text-[#ff6900]"
  } else if (numValue >= 3) {
    bgColor = "bg-[#ff6900]/10"
    textColor = "text-[#ff6900]/80"
  } else {
    bgColor = "bg-[var(--color-dark-1)]/5"
    textColor = "text-[var(--color-dark-1)]/50"
  }
  
  return (
    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {value}
    </span>
  )
}

// Final grade pill - larger and more prominent
function FinalGradePill({ value }: { value: string }) {
  const numValue = parseGrade(value)
  
  // Color intensity based on grade
  let bgColor = "bg-[#ff6900]"
  let shadow = "shadow-[0_2px_8px_rgba(255,105,0,0.3)]"
  
  if (numValue < 6) {
    bgColor = "bg-[var(--color-dark-1)]/60"
    shadow = ""
  } else if (numValue < 7) {
    bgColor = "bg-[#ff6900]/70"
    shadow = "shadow-[0_2px_8px_rgba(255,105,0,0.2)]"
  }
  
  return (
    <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-semibold text-white ${bgColor} ${shadow}`}>
      {value}
    </span>
  )
}

// Sortable header component
function SortableHeader({
  children,
  sortKey,
  currentSort,
  currentDirection,
  onSort,
}: {
  children: React.ReactNode
  sortKey: "votoFinale" | "quartiere"
  currentSort: "votoFinale" | "quartiere" | null
  currentDirection: "asc" | "desc"
  onSort: (key: "votoFinale" | "quartiere") => void
}) {
  const isActive = currentSort === sortKey
  
  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className="flex items-center gap-1 text-left hover:text-white/80 transition-colors"
    >
      <span>{children}</span>
      {isActive ? (
        currentDirection === "desc" ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
      )}
    </button>
  )
}

export function PizzeriaTable({ data }: { data?: PizzeriaData[] | null }) {
  const [sortKey, setSortKey] = useState<"votoFinale" | "quartiere" | null>("votoFinale")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const safeData = Array.isArray(data) ? data : []

  const handleSort = (key: "votoFinale" | "quartiere") => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc")
    } else {
      setSortKey(key)
      setSortDirection(key === "votoFinale" ? "desc" : "asc")
    }
  }

  const sortedData = sortData(safeData, sortKey, sortDirection)

  return (
    <div className="my-10 overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-[var(--color-dark-1)]/5">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          {/* Header */}
          <thead className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] text-xs font-medium tracking-wide text-white">
            <tr>
              <th className="w-[30%] px-5 py-4 text-left">Pizzeria</th>
              <th className="w-[15%] px-4 py-4 text-left">
                <SortableHeader
                  sortKey="quartiere"
                  currentSort={sortKey}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Quartiere
                </SortableHeader>
              </th>
              <th className="w-[12%] px-3 py-4 text-center">
                <div className="inline-flex items-center gap-1.5">
                  <PizzaIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Pizza</span>
                </div>
              </th>
              <th className="w-[12%] px-3 py-4 text-center">
                <div className="inline-flex items-center gap-1.5">
                  <Squircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Supplì</span>
                </div>
              </th>
              <th className="w-[12%] px-3 py-4 text-center">
                <div className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Servizio</span>
                </div>
              </th>
              <th className="w-[12%] px-4 py-4 text-center">
                <SortableHeader
                  sortKey="votoFinale"
                  currentSort={sortKey}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                >
                  Voto
                </SortableHeader>
              </th>
            </tr>
          </thead>
          
          {/* Body */}
          <tbody className="divide-y divide-[var(--color-sand)]/60">
            {sortedData.map((row, index) => (
              <tr
                key={`${row.pizzeria}-${index}`}
                className="transition-colors hover:bg-[var(--color-sand)]/30"
              >
                {/* Pizzeria name - prominent */}
                <td className="px-5 py-4">
                  <span className="font-medium text-[var(--color-dark-1)]">
                    {row.pizzeria}
                  </span>
                </td>
                
                {/* Quartiere - secondary */}
                <td className="px-4 py-4">
                  <span className="rounded-full bg-[var(--color-sand)]/60 px-2.5 py-1 text-xs font-medium text-[var(--color-dark-1)]/70">
                    {row.quartiere}
                  </span>
                </td>
                
                {/* Criteria grades - centered pills */}
                <td className="px-3 py-4 text-center">
                  <GradePill value={row.votoPizza} />
                </td>
                <td className="px-3 py-4 text-center">
                  <GradePill value={row.votoSuppli} />
                </td>
                <td className="px-3 py-4 text-center">
                  <GradePill value={row.votoServizio} />
                </td>
                
                {/* Final grade - prominent orange pill */}
                <td className="px-4 py-4 text-center">
                  <FinalGradePill value={row.votoFinale} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Helper to parse markdown table data
export function parseTableData(rows: string[][]): PizzeriaData[] {
  return rows.map(row => ({
    pizzeria: row[0]?.trim() || "",
    quartiere: row[1]?.trim() || "",
    votoPizza: row[2]?.trim() || "—",
    votoSuppli: row[3]?.trim() || "—",
    votoServizio: row[4]?.trim() || "—",
    votoFinale: row[5]?.trim() || "—",
  }))
}
