"use client"

import React from "react"
import { Bell, Plus, Search } from "lucide-react"

interface ApplicationHeaderProps {
  onSearch?: (query: string) => void
  onUploadResume?: () => void
}

export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  onSearch,
  onUploadResume,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input Bar */}
      <div className="relative flex max-w-md flex-1 items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search jobs, companies, or skills..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="h-10 w-full rounded-xl border border-white/10 bg-[#121217] pr-4 pl-10 text-xs text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:outline-none sm:text-sm"
        />
      </div>

      {/* Right Controls: Notifications & Upload Resume */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#121217] text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
        </button>

        {/* Upload Resume Button */}
        <button
          type="button"
          onClick={onUploadResume}
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-neutral-200 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Resume</span>
        </button>
      </div>
    </div>
  )
}

export default ApplicationHeader
