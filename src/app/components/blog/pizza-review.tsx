"use client"

import { useState, useEffect } from "react"
import type React from "react"
import {
  Pizza,
  Flame,
  ChefHat,
  Sparkles,
  Star,
  CircleDollarSign,
  Users,
  LayoutGrid,
  UtensilsCrossed,
  ChevronDown,
  Squircle,
} from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

/* ============================================================================
   GRADE PILL - Circle that maintains 1:1 aspect ratio
   Uses aspect-square to ensure width = height
   ============================================================================ */
function GradePill({ index, grade }: { index: number; grade: number }) {
  const filled = grade >= index
  const isHalf = !filled && grade >= index - 0.5

  // Base: flex-1 to take equal space, aspect-square for perfect circle
  const baseClasses =
    "flex aspect-square flex-1 items-center justify-center rounded-full text-sm lg:text-base font-medium transition-all"

  if (filled) {
    return (
      <div className={`${baseClasses} bg-[#ff6900] text-white`}>
        {index}
      </div>
    )
  }

  if (isHalf) {
    return (
      <div
        className={baseClasses}
        style={{
          background: "linear-gradient(90deg, #ff6900 50%, #ffeee6 50%)",
          color: "#fff",
        }}
      >
        {index}
      </div>
    )
  }

  return (
    <div className={`${baseClasses} bg-[#ffeee6] text-[#ffb899]`}>
      {index}
    </div>
  )
}

/* ============================================================================
   CRITERIA ITEM - Full-width card with icon, label, and 5 large grade pills
   ============================================================================ */
function CriteriaItem({
  name,
  icon: Icon,
  grade,
}: {
  name: string
  icon: React.ElementType
  grade: number
}) {
  return (
    <div className="rounded-2xl bg-white px-4 py-4">
      {/* Label row */}
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-6 w-6 text-[#ff6900]" strokeWidth={2} />
        <span className="body-l text-[#1a1a1a]">{name}</span>
      </div>
      {/* Pills row - equal width with gap, aspect-square makes them circles */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <GradePill key={i} index={i} grade={grade} />
        ))}
      </div>
    </div>
  )
}

/* ============================================================================
   COLLAPSIBLE CATEGORY CARD - Container for Pizza / Supplì / Extra
   ============================================================================ */
function CategoryCard({
  title,
  icon: Icon,
  overallGrade,
  criteria,
  defaultExpanded = true,
  collapsible = true,
  mobileOnly = false, // If true, only collapsible on mobile
  variant = "default",
}: {
  title: string
  icon: React.ElementType
  overallGrade: number
  criteria: Array<{ name: string; icon: React.ElementType; grade: number }>
  defaultExpanded?: boolean
  collapsible?: boolean
  mobileOnly?: boolean
  variant?: "default" | "secondary"
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Determine if this card is actually collapsible based on screen size
  const isCollapsible = mobileOnly ? (isMobile && collapsible) : collapsible

  // On mobile, start collapsed for collapsible cards
  useEffect(() => {
    if (isMobile && isCollapsible) {
      setIsExpanded(false)
    } else if (!isMobile && !mobileOnly) {
      setIsExpanded(defaultExpanded)
    } else if (!isMobile && mobileOnly) {
      setIsExpanded(true) // Always expanded on desktop if mobileOnly
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <div className={`rounded-3xl bg-[#f8f4ef] p-4 ${variant === "secondary" ? "lg:col-span-1" : "lg:col-span-3"}`}>
      {/* Header - clickable if collapsible */}
      <button
        type="button"
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
        className={`flex w-full items-center justify-between ${
          isCollapsible ? "cursor-pointer" : "cursor-default"
        }`}
        disabled={!isCollapsible}
      >
        <div className="flex items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center">
            <Icon className="h-7 w-7 text-[#ff6900]" strokeWidth={2} />
          </div>
          <span className="text-xl text-[#1a1a1a]">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6900] text-white">
            {overallGrade.toFixed(1)}
          </div>
          {isCollapsible && (
            <ChevronDown
              className={`h-5 w-5 text-[#1a1a1a]/50 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      </button>

      {/* Criteria list - collapsible */}
      <div
        className={`grid gap-2 overflow-hidden transition-all duration-300 ${
          isExpanded ? "mt-4 max-h-[1000px] opacity-100" : "mt-0 max-h-0 opacity-0"
        } ${variant === "secondary" ? "lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {criteria.map((c) => (
          <CriteriaItem key={c.name} {...c} />
        ))}
      </div>
    </div>
  )
}

/* ============================================================================
   RADAR CHART - Beautiful radar visualization with improved styling
   ============================================================================ */
function OverallGradeChart({
  data,
  overallGrade,
}: {
  data: Array<{ category: string; grade: number }>
  overallGrade: number
}) {
  return (
    <div className="flex h-full min-h-[350px] flex-col rounded-3xl bg-white p-5 lg:col-span-4">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-[#1a1a1a]">Voto Complessivo</h4>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6900] text-white">
          {overallGrade.toFixed(1)}
        </div>
      </div>
      {/* Chart - larger and centered */}
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={data}
              margin={{ top: 40, right: 50, bottom: 40, left: 50 }}
            >
              {/* Background grid - softer, more elegant */}
              <PolarGrid
                stroke="#e8e4df"
                strokeWidth={1}
                gridType="polygon"
                radialLines={false}
              />
              {/* Category labels */}
              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fill: "#9ca3af",
                  fontSize: 14,
                  fontWeight: 500,
                }}
                tickLine={false}
                axisLine={false}
              />
              {/* Data area - orange with glow effect */}
              <Radar
                dataKey="grade"
                stroke="#ff6900"
                strokeWidth={2.5}
                fill="url(#radarGradient)"
                fillOpacity={1}
              />
              {/* Gradient definition */}
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6900" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff6900" stopOpacity={0.1} />
                </radialGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Pizza Review Component with all grades
interface PizzaGrades {
  croccantezza: number
  cottura: number
  impasto: number
  condimenti: number
}

interface SuppliGrades {
  panatura: number
  ripieno: number
  cottura: number
}

interface ExtraGrades {
  servizio?: number
  prezzo?: number
  varieta?: number
}

export function PizzaReview({ 
  pizza, 
  suppli, 
  extra 
}: { 
  pizza: PizzaGrades; 
  suppli?: SuppliGrades | null; 
  extra?: ExtraGrades 
}) {
  // Calculate averages
  const pizzaAvg = (pizza.croccantezza + pizza.cottura + pizza.impasto + pizza.condimenti) / 4
  
  const suppliAvg = suppli 
    ? (suppli.panatura + suppli.ripieno + suppli.cottura) / 3 
    : null
  
  const extraValues = extra ? Object.values(extra).filter((v): v is number => v !== undefined && v !== null) : []
  const extraAvg = extraValues.length > 0 
    ? extraValues.reduce((a, b) => a + b, 0) / extraValues.length 
    : null

  // Prepare radar data
  const radarData = [
    { category: "Pizza", grade: pizzaAvg },
    ...(suppliAvg !== null ? [{ category: "Supplì", grade: suppliAvg }] : []),
    ...(extraAvg !== null ? [{ category: "Extra", grade: extraAvg }] : []),
  ]

  const pizzaCriteria = [
    { name: "Croccantezza", icon: Sparkles, grade: pizza.croccantezza },
    { name: "Cottura", icon: Flame, grade: pizza.cottura },
    { name: "Impasto", icon: ChefHat, grade: pizza.impasto },
    { name: "Condimenti", icon: UtensilsCrossed, grade: pizza.condimenti },
  ]

  const suppliCriteria = suppli ? [
    { name: "Panatura", icon: Sparkles, grade: suppli.panatura },
    { name: "Ripieno", icon: ChefHat, grade: suppli.ripieno },
    { name: "Cottura", icon: Flame, grade: suppli.cottura },
  ] : []

  const extraCriteria = extra ? [
    ...(extra.servizio !== undefined ? [{ name: "Servizio", icon: Users, grade: extra.servizio }] : []),
    ...(extra.prezzo !== undefined ? [{ name: "Prezzo", icon: CircleDollarSign, grade: extra.prezzo }] : []),
    ...(extra.varieta !== undefined ? [{ name: "Varietà", icon: LayoutGrid, grade: extra.varieta }] : []),
  ] : []

  // Determine layout based on what data we have
  const hasSuppli = suppli && suppliCriteria.length > 0
  const hasExtra = extra && extraCriteria.length > 0
  const showRadar = radarData.length > 1

  // Calculate overall average for radar
  const overallAvg = radarData.reduce((sum, d) => sum + d.grade, 0) / radarData.length

  return (
    <div className="not-prose my-10 space-y-4">
      {/* ROW 1: Radar Chart (left) + Pizza Card (right) */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Overall Grade Radar Chart */}
        {showRadar && (
          <OverallGradeChart data={radarData} overallGrade={overallAvg} />
        )}

        {/* Pizza Card - collapsible only on mobile */}
        <CategoryCard
          title="Pizza"
          icon={Pizza}
          overallGrade={pizzaAvg}
          criteria={pizzaCriteria}
          defaultExpanded={true}
          collapsible={true}
          mobileOnly={true}
        />
      </div>

      {/* ROW 2: Supplì Card + Extra Card - use items-start so they don't stretch */}
      <div className="grid items-start gap-4">
        {/* Supplì Card - collapsed by default on desktop */}
        {hasSuppli && (
          <CategoryCard
            title="Supplì"
            icon={Squircle}
            overallGrade={suppliAvg!}
            criteria={suppliCriteria}
            defaultExpanded={false}
            collapsible={true}
            variant="secondary"
          />
        )}

        {/* Extra Card - collapsed by default on desktop */}
        {hasExtra && (
          <CategoryCard
            title="Extra"
            icon={Star}
            overallGrade={extraAvg!}
            criteria={extraCriteria}
            defaultExpanded={false}
            collapsible={true}
            variant="secondary"
          />
        )}
      </div>
    </div>
  )
}
