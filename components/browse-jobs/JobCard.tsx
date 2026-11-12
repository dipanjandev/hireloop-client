"use client"

import React, { useState } from "react"
import {
  Bookmark,
  Building2,
  Clock,
  DollarSign,
  Globe2,
  MapPin,
} from "lucide-react"
import { DisplayJobItem } from "@/types/job"
import { useRouter } from "next/navigation"

interface JobCardProps {
  job: DisplayJobItem
  onBookmark?: (jobId: string) => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    onBookmark?.(job._id)
  }

  const router = useRouter()

  const handleDetailsPage = (jobIdPage: string) => {
    router.push(`/browse-jobs/${jobIdPage}`)
  }

  return (
    <div className="group relative flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[#0e0e15]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-[#12121c] sm:p-6">
      {/* Top Row: Company Avatar + Title & Info + Bookmark */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Company Avatar / Logo Box */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-[#1a1a24] to-[#12121a] text-lg font-bold text-white shadow-inner sm:h-14 sm:w-14">
            <Building2 className="h-6 w-6 text-[#8a75ff]" />
          </div>

          {/* Job Title & Company/Location */}
          <div>
            <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#a292ff] sm:text-lg">
              {job.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400 sm:text-sm">
              <span className="font-medium text-neutral-300">
                {job.companyName}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-1 text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                {job.location || "Remote"}
                {job.isRemote && " (Remote)"}
              </span>
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label="Bookmark Job"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <Bookmark
            className={`h-4 w-4 transition-colors ${
              isBookmarked ? "fill-[#8a75ff] text-[#8a75ff]" : ""
            }`}
          />
        </button>
      </div>

      {/* Bottom Row: Tags + Apply Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        {/* Badges / Meta Info */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Compensation Badge */}
          {job.compensation && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-neutral-200">
              <DollarSign className="h-3 w-3 text-emerald-400" />
              <span>{job.compensation}</span>
            </span>
          )}

          {/* Job Type Badge */}
          {job.jobType && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-neutral-200">
              <Clock className="h-3 w-3 text-blue-400" />
              <span>{job.jobType}</span>
            </span>
          )}

          {/* Remote Badge */}
          {job.isRemote && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300">
              <Globe2 className="h-3 w-3" />
              <span>Remote</span>
            </span>
          )}

          {/* Department / Category Badge */}
          {job.department && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-neutral-400">
              <span>{job.department}</span>
            </span>
          )}
        </div>

        {/* Apply Now Button (কার্ডের উপর নির্দেশিত এপ্লাই বাটন) */}
        <button
          type="button"
          onClick={() => handleDetailsPage(job._id)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#5851ff] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(88,81,255,0.35)] transition-all duration-200 hover:bg-[#4942f2] hover:shadow-[0_0_20px_rgba(88,81,255,0.55)] active:scale-95 sm:text-sm"
        >
          <span>View Details</span>
        </button>
      </div>
    </div>
  )
}

export default JobCard
