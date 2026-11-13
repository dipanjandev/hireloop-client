"use client"

import React from "react"
import { BookmarkCheck, Clock } from "lucide-react"

interface ApplicationStatsProps {
  totalCount?: number
  closingSoonCount?: number
  totalLabel?: string
  closingSoonLabel?: string
}

export const ApplicationStats: React.FC<ApplicationStatsProps> = ({
  totalCount = ApplicationStats.length,
  closingSoonCount = 3,
  totalLabel = "Total Saved",
  closingSoonLabel = "Closing Soon",
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Metric 1: Total Saved / Total Applied */}
      <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0e0e15]/90 px-4 py-3 shadow-md backdrop-blur-xl sm:px-5 sm:py-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
          <BookmarkCheck className="h-5 w-5 text-neutral-200" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-neutral-400">
            {totalLabel}
          </div>
          <div className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {totalCount}
          </div>
        </div>
      </div>

      {/* Metric 2: Closing Soon / In Review */}
      <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0e0e15]/90 px-4 py-3 shadow-md backdrop-blur-xl sm:px-5 sm:py-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-neutral-400">
            {closingSoonLabel}
          </div>
          <div className="text-xl font-bold tracking-tight text-amber-400 sm:text-2xl">
            {closingSoonCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationStats
