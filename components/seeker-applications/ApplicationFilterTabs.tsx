"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

export interface FilterTab {
  id: string
  label: string
  count?: number
}

interface ApplicationFilterTabsProps {
  tabs?: FilterTab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  onSortChange?: (sortOption: string) => void
}

const DEFAULT_TABS: FilterTab[] = [
  { id: "all", label: "All Saved" },
  { id: "design", label: "Design", count: 8 },
  { id: "engineering", label: "Engineering", count: 12 },
  { id: "product", label: "Product", count: 4 },
]

export const ApplicationFilterTabs: React.FC<ApplicationFilterTabsProps> = ({
  tabs = DEFAULT_TABS,
  activeTab: controlledActiveTab,
  onTabChange,
  onSortChange,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || "all")
  const currentTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Category / Status Tabs */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "border border-white/20 bg-white/10 text-white shadow-inner"
                  : "border border-transparent text-neutral-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[11px] ${isActive ? "text-neutral-300" : "text-neutral-500"}`}>
                  ({tab.count})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Sort Dropdown */}
      <div className="flex shrink-0 items-center gap-2 text-xs sm:text-sm">
        <span className="text-neutral-400">Sort by:</span>
        <div className="relative inline-flex items-center">
          <select
            defaultValue="recently_saved"
            onChange={(e) => onSortChange?.(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#121217] py-2 pr-8 pl-3.5 text-xs font-semibold text-neutral-200 transition-colors focus:border-[#5851ff] focus:outline-none sm:text-sm"
          >
            <option value="recently_saved" className="bg-[#121217]">
              Recently Saved
            </option>
            <option value="recently_applied" className="bg-[#121217]">
              Recently Applied
            </option>
            <option value="closing_soon" className="bg-[#121217]">
              Closing Soon
            </option>
            <option value="highest_salary" className="bg-[#121217]">
              Highest Salary
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-neutral-400" />
        </div>
      </div>
    </div>
  )
}

export default ApplicationFilterTabs
