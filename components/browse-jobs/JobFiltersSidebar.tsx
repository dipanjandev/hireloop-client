"use client"

import React, { useState } from "react"
import { JOB_TYPES, JOB_CATEGORIES } from "@/types/job"

interface JobFiltersSidebarProps {
  className?: string
  selectedJobType?: string
  selectedCategory?: string
  onJobTypeChange?: (type: string) => void
  onCategoryChange?: (category: string) => void
}

export const JobFiltersSidebar: React.FC<JobFiltersSidebarProps> = ({
  className = "",
  selectedJobType,
  selectedCategory,
  onJobTypeChange,
  onCategoryChange,
}) => {
  // ১. রেডিও সিলেকশন স্টেট (ক্লিক করলে সাথে সাথে একটিভ দেখানোর জন্য)
  const [activeJobType, setActiveJobType] = useState<string>(selectedJobType || "")
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || "")

  // ২. Job Type রেডিও হ্যান্ডলার
  const handleJobTypeSelect = (type: string) => {
    setActiveJobType(type)
    if (onJobTypeChange) {
      onJobTypeChange(type)
    }
  }

  // ৩. Job Category রেডিও হ্যান্ডলার
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
    if (onCategoryChange) {
      onCategoryChange(category)
    }
  }

  // কারেন্ট সিলেক্টেড ভ্যালু
  const currentJobType = selectedJobType !== undefined ? selectedJobType : activeJobType
  const currentCategory = selectedCategory !== undefined ? selectedCategory : activeCategory

  return (
    <aside
      className={`w-full rounded-2xl border border-white/10 bg-[#0d0d14]/80 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6 lg:w-72 ${className}`}
    >
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-lg font-bold tracking-tight text-white">Filters</h2>
        <span className="text-xs text-neutral-400">Refine Results</span>
      </div>

      <div className="space-y-6">
        {/* ========================================================= */}
        {/* ফিল্টার ১: Job Type (Radio Buttons) */}
        {/* ========================================================= */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            Job Type
          </h3>
          <div className="space-y-2">
            {/* All Types অপশন */}
            <label
              onClick={() => handleJobTypeSelect("")}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-sm transition-all ${
                currentJobType === ""
                  ? "border-[#5851ff]/40 bg-[#5851ff]/10 text-white shadow-[0_0_15px_rgba(88,81,255,0.15)]"
                  : "border-transparent text-neutral-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="jobTypeFilter"
                  value=""
                  checked={currentJobType === ""}
                  onChange={() => handleJobTypeSelect("")}
                  className="h-4 w-4 border-neutral-700 bg-neutral-900 text-[#5851ff] accent-[#5851ff] focus:ring-0"
                />
                <span className="font-medium">All Job Types</span>
              </div>
            </label>

            {/* ডায়নামিক Job Types অপশন */}
            {JOB_TYPES.map((type) => {
              const isSelected = currentJobType === type
              return (
                <label
                  key={type}
                  onClick={() => handleJobTypeSelect(type)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-sm transition-all ${
                    isSelected
                      ? "border-[#5851ff]/40 bg-[#5851ff]/10 text-white shadow-[0_0_15px_rgba(88,81,255,0.15)]"
                      : "border-transparent text-neutral-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="jobTypeFilter"
                      value={type}
                      checked={isSelected}
                      onChange={() => handleJobTypeSelect(type)}
                      className="h-4 w-4 border-neutral-700 bg-neutral-900 text-[#5851ff] accent-[#5851ff] focus:ring-0"
                    />
                    <span className="font-medium">{type}</span>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        <div className="border-t border-white/5" />

        {/* ========================================================= */}
        {/* ফিল্টার ২: Job Category (Radio Buttons) */}
        {/* ========================================================= */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            Job Category
          </h3>
          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {/* All Categories অপশন */}
            <label
              onClick={() => handleCategorySelect("")}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-sm transition-all ${
                currentCategory === ""
                  ? "border-[#5851ff]/40 bg-[#5851ff]/10 text-white shadow-[0_0_15px_rgba(88,81,255,0.15)]"
                  : "border-transparent text-neutral-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="categoryFilter"
                  value=""
                  checked={currentCategory === ""}
                  onChange={() => handleCategorySelect("")}
                  className="h-4 w-4 border-neutral-700 bg-neutral-900 text-[#5851ff] accent-[#5851ff] focus:ring-0"
                />
                <span className="font-medium">All Categories</span>
              </div>
            </label>

            {/* ডায়নামিক Categories অপশন */}
            {JOB_CATEGORIES.map((cat) => {
              const isSelected = currentCategory === cat
              return (
                <label
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-sm transition-all ${
                    isSelected
                      ? "border-[#5851ff]/40 bg-[#5851ff]/10 text-white shadow-[0_0_15px_rgba(88,81,255,0.15)]"
                      : "border-transparent text-neutral-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="categoryFilter"
                      value={cat}
                      checked={isSelected}
                      onChange={() => handleCategorySelect(cat)}
                      className="h-4 w-4 border-neutral-700 bg-neutral-900 text-[#5851ff] accent-[#5851ff] focus:ring-0"
                    />
                    <span className="line-clamp-1 font-medium">{cat}</span>
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default JobFiltersSidebar
