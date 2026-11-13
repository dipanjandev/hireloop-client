"use client"

import React, { useState } from "react"
import {
  Bookmark,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  XCircle,
} from "lucide-react"
import { DisplayApplicationItem } from "@/types/application"

interface ApplicationCardProps {
  application: DisplayApplicationItem
  onApply?: (jobId: string) => void
  onBookmarkToggle?: (jobId: string) => void
  onRemove?: (id: string) => void
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onApply,
  onBookmarkToggle,
  onRemove,
}) => {
  const [isSaved, setIsSaved] = useState(application.isSaved ?? true)

  const handleBookmark = () => {
    setIsSaved(!isSaved)
    onBookmarkToggle?.(application.jobId)
  }

  return (
    <div className="group relative flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[#0e0e15]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-[#12121c] sm:flex-row sm:items-center sm:p-6">
      {/* Left: Company Icon + Job Title & Metadata */}
      <div className="flex items-start gap-4 sm:items-center sm:gap-5">
        {/* Company Icon Square */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-[#1a1a24] to-[#12121a] text-lg font-bold text-white shadow-inner sm:h-14 sm:w-14">
          <Building2 className="h-6 w-6 text-[#8a75ff]" />
        </div>

        {/* Title, Company Tag, Location, Salary */}
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#a292ff] sm:text-lg">
              {application.jobTitle}
            </h3>

            {/* Company Tag Pill (হুবহু স্ক্রিনশটের স্টাইল) */}
            <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              {application.companyTag || application.companyName}
            </span>
          </div>

          {/* Sub-row: Location & Salary Info */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-neutral-400 sm:text-sm">
            {/* Location */}
            <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
              <MapPin className="h-3.5 w-3.5 text-neutral-500" />
              <span>{application.location}</span>
            </div>

            {/* Salary */}
            {application.salary && (
              <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                <span>{application.salary}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Time, Status / Deadline & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 sm:flex-nowrap sm:border-0 sm:pt-0">
        {/* Saved/Applied Time & Status Tag */}
        <div className="text-left sm:text-right">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 sm:justify-end">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            <span>{application.appliedTimeFormatted}</span>
          </div>

          {/* Closes in 3 days / Closed status */}
          {application.closesInText && (
            <div className="mt-1 text-xs font-semibold text-amber-400">
              {application.closesInText}
            </div>
          )}

          {application.isClosed && (
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-neutral-500">
              <XCircle className="h-3 w-3 text-red-400/80" />
              <span>Closed yesterday</span>
            </div>
          )}
        </div>

        {/* Action Buttons: Bookmark & Apply / Status */}
        <div className="flex items-center gap-2.5">
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmark}
            aria-label="Bookmark"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <Bookmark
              className={`h-4 w-4 ${isSaved ? "fill-white text-white" : ""}`}
            />
          </button>

          {/* Primary Action Button */}
          {application.isClosed ? (
            <button
              type="button"
              onClick={() => onRemove?.(application._id)}
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-neutral-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 sm:text-sm"
            >
              Remove from List
            </button>
          ) : application.status === "draft" ? (
            <button
              type="button"
              onClick={() => onApply?.(application.jobId)}
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-xs font-semibold text-neutral-200 transition-colors hover:bg-white/10 hover:text-white sm:text-sm"
            >
              Draft Started
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onApply?.(application.jobId)}
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-5 text-xs font-bold text-neutral-950 shadow-md transition-all duration-200 hover:bg-neutral-200 active:scale-95 sm:text-sm"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationCard
