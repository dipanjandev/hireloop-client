"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface JobPaginationProps {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export const JobPagination: React.FC<JobPaginationProps> = ({
  currentPage = 1,
  totalPages = 42,
  onPageChange,
}) => {
  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        aria-label="Previous Page"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#111116] text-neutral-400 transition-colors hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page 1 (Active by default in UI matching Figma) */}
      <button
        type="button"
        onClick={() => onPageChange?.(1)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white text-sm font-bold text-neutral-950 shadow-md transition-colors"
      >
        1
      </button>

      {/* Page 2 */}
      <button
        type="button"
        onClick={() => onPageChange?.(2)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#111116] text-sm font-medium text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
      >
        2
      </button>

      {/* Page 3 */}
      <button
        type="button"
        onClick={() => onPageChange?.(3)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#111116] text-sm font-medium text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
      >
        3
      </button>

      {/* Ellipsis */}
      <span className="flex h-10 w-8 items-center justify-center text-sm text-neutral-500">
        ...
      </span>

      {/* Last Page */}
      <button
        type="button"
        onClick={() => onPageChange?.(totalPages)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#111116] text-sm font-medium text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
      >
        {totalPages}
      </button>

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        aria-label="Next Page"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#111116] text-neutral-400 transition-colors hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export default JobPagination
