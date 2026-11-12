"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"

interface JobSearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: (searchQuery: string) => void
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({
  placeholder = "Search by job title, keywords...",
  value,
  onChange,
  onSearch,
}) => {
  // ১. সার্চ ইনপুট স্টেট (ডিফল্ট বা প্রপ্স থেকে)
  const [searchTerm, setSearchTerm] = useState(value || "")

  // ২. ইনপুট লেখার হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  // ৩. সার্চ বাটন ক্লিক হ্যান্ডলার (এখানে আপনার সার্চ লজিক বসাতে পারেন)
  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)

    // যদি প্যারেন্ট থেকে onSearch পাঠানো হয় তবে তা কল হবে
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  return (
    <form
      onSubmit={handleSearchClick}
      className="relative flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#111116] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all focus-within:border-white/20 sm:p-2.5"
    >
      <div className="flex flex-1 items-center gap-3 pl-3 sm:pl-4">
        <Search className="h-5 w-5 shrink-0 text-neutral-400" />
        <input
          type="text"
          value={value !== undefined ? value : searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none sm:text-base"
        />
      </div>

      {/* সার্চ একশন বাটন (handleSearchClick হ্যান্ডলার সংযুক্ত) */}
      <button
        type="submit"
        onClick={handleSearchClick}
        className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white px-5 py-3 text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 active:scale-95 sm:px-7 sm:text-sm"
      >
        Search Jobs
      </button>
    </form>
  )
}

export default JobSearchBar
