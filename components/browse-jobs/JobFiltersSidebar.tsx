"use client"

import React, { useState } from "react"
import { JOB_TYPES, JOB_CATEGORIES } from "@/types/job"
import { useRouter } from "next/navigation"

// ========================================================
// ১. রিইউজেবল ফিল্টার গ্রুপ কম্পোনেন্ট (মেন্টর স্টাইল)
// ========================================================
interface FilterRadioGroupProps {
  title: string
  name: string
  options: readonly string[]
  selectedValue?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterRadioGroup: React.FC<FilterRadioGroupProps> = ({
  title,
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold tracking-wider text-neutral-300 uppercase">
        {title}
      </h3>
      <div className="space-y-1.5">
        {options.map((option) => {
          // যদি "All ..." অপশন হয় তবে সেটার আসল ভ্যালু খালি স্ট্রিং ""
          const isAllOption = option.startsWith("All")
          const optionValue = isAllOption ? "" : option
          const isChecked = selectedValue === optionValue

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-sm transition-all ${
                isChecked
                  ? "border-[#5851ff]/40 bg-[#5851ff]/10 text-white shadow-[0_0_15px_rgba(88,81,255,0.15)]"
                  : "border-transparent text-neutral-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name={name} // 👈 ফিল্টারের নাম ("jobType" অথবা "category")
                  value={optionValue} // 👈 ফিল্টারের মান ("Full-time" ইত্যাদি)
                  checked={isChecked}
                  onChange={onChange} // 👈 সেই মূল হ্যান্ডলার
                  className="h-4 w-4 border-neutral-700 bg-neutral-900 text-[#5851ff] accent-[#5851ff] focus:ring-0"
                />
                <span className="font-medium">{option}</span>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}

// ========================================================
// ২. মূল সাইডবার কম্পোনেন্ট (প্রপ্স হ্যান্ডলার সহ)
// ========================================================
interface JobFiltersSidebarProps {
  className?: string
  onFilterChange?: (name: string, value: string) => void
}

export const JobFiltersSidebar: React.FC<JobFiltersSidebarProps> = ({
  className = "",
  onFilterChange,
}) => {
  // কোন কোন ফিল্টার বর্তমানে সিলেক্টেড আছে
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: "",
    category: "",
  })
  const router = useRouter()

  // 👉 সেই একক হ্যান্ডলার ফাংশন! (Single Change Handler)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target

    // ১. স্টেট আপডেট করা (একটিভ রেডিও দেখানোর জন্য)
    setSelectedFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    // console.log(`👉 ক্লিক করা ফিল্টার: ${e.target.name} -> ${e.target.value}`)

    // এখানে আমরা জব গুলোকে দেখানোর কাজ টা করলাম ফিল্টারিং এর মাধ্যমে।
    const params = new URLSearchParams(window.location.search)
    params.set(e.target.name, e.target.value)
    router.push(`/browse-jobs?${params.toString()}`)

    // ৩. প্যারেন্ট কম্পোনেন্টকে প্রপসের মাধ্যমে খবর পৌঁছে দেওয়া
    if (onFilterChange) {
      onFilterChange(e.target.name, e.target.value)
    }
  }

  return (
    <aside
      className={`w-full rounded-2xl border border-white/10 bg-[#0d0d14]/80 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6 lg:w-72 ${className}`}
    >
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-lg font-bold tracking-tight text-white">Filters</h2>
        <span className="text-xs text-neutral-400">Refine Results</span>
      </div>

      <div className="space-y-6">
        {/* ফিল্টার ১: Job Type (FilterRadioGroup কম্পোনেন্ট দিয়ে) */}
        <FilterRadioGroup
          title="Job Type"
          name="jobType"
          options={["All Job Types", ...JOB_TYPES]}
          selectedValue={selectedFilters.jobType}
          onChange={handleChange}
        />

        <div className="border-t border-white/5" />

        {/* ফিল্টার ২: Job Category (হুবহু একই কম্পোনেন্ট রিইউজ করা হলো) */}
        <div className="max-h-80 overflow-y-auto pr-1">
          <FilterRadioGroup
            title="Job Category"
            name="category"
            options={["All Categories", ...JOB_CATEGORIES]}
            selectedValue={selectedFilters.category}
            onChange={handleChange}
          />
        </div>
      </div>
    </aside>
  )
}

export default JobFiltersSidebar
