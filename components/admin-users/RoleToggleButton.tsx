"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, User, Briefcase, ShieldAlert } from "lucide-react"
import { UserRole } from "@/types/user"

interface RoleToggleButtonProps {
  userId: string
  currentRole?: UserRole | string
  onRoleChange: (userId: string, newRole: UserRole) => void
}

export const RoleToggleButton: React.FC<RoleToggleButtonProps> = ({
  userId,
  currentRole = "seeker",
  onRoleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const normalizedRole = (currentRole?.toLowerCase() || "seeker") as UserRole

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার হুক
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // পরবর্তী রোল সাইকেল লজিক (seeker -> recruiter -> admin -> seeker)
  const getNextRole = (role: UserRole): UserRole => {
    if (role === "seeker") return "recruiter"
    if (role === "recruiter") return "admin"
    return "seeker"
  }

  // কুইক টগল
  const handleToggleNext = () => {
    const next = getNextRole(normalizedRole)
    onRoleChange(userId, next)
  }

  // স্পেসিফিক রোল সিলেক্ট
  const handleSelectRole = (role: UserRole) => {
    setIsOpen(false)
    if (role !== normalizedRole) {
      onRoleChange(userId, role)
    }
  }

  // স্ক্রিনশটের মতো ডাইনামিক বাটন টেক্সট
  const getButtonLabel = (role: UserRole) => {
    if (role === "seeker") return "Make Recruiter"
    if (role === "recruiter") return "Make Seeker"
    return "Toggle Role"
  }

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      {/* স্ক্রিনশটের স্টাইলে মূল অ্যাকশন বাটন */}
      <button
        type="button"
        onClick={handleToggleNext}
        className="text-xs font-medium text-neutral-300 transition-colors hover:text-white hover:underline cursor-pointer"
        title={`Click to toggle role (Next: ${getNextRole(normalizedRole)})`}
      >
        {getButtonLabel(normalizedRole)}
      </button>

      {/* ছোট ড্রপডাউন ট্রিগার (Seeker, Recruiter, Admin এর যে কোনোটি বেছে নেওয়ার জন্য) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="ml-1 flex h-5 w-5 items-center justify-center rounded text-neutral-500 hover:text-neutral-300 hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Select role options"
      >
        <ChevronDown className="h-3 w-3" />
      </button>

      {/* ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="absolute right-0 top-7 z-50 w-44 rounded-xl border border-white/10 bg-[#12121a] p-1.5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
            Change Role
          </div>

          <div className="space-y-0.5">
            {/* Seeker Option */}
            <button
              type="button"
              onClick={() => handleSelectRole("seeker")}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                normalizedRole === "seeker"
                  ? "bg-white/10 text-white font-medium"
                  : "text-neutral-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-neutral-400" />
                <span>Seeker</span>
              </div>
              {normalizedRole === "seeker" && (
                <span className="text-[10px] text-emerald-400">Current</span>
              )}
            </button>

            {/* Recruiter Option */}
            <button
              type="button"
              onClick={() => handleSelectRole("recruiter")}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                normalizedRole === "recruiter"
                  ? "bg-blue-500/20 text-blue-300 font-medium"
                  : "text-neutral-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-blue-400" />
                <span>Recruiter</span>
              </div>
              {normalizedRole === "recruiter" && (
                <span className="text-[10px] text-blue-400">Current</span>
              )}
            </button>

            {/* Admin Option */}
            <button
              type="button"
              onClick={() => handleSelectRole("admin")}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                normalizedRole === "admin"
                  ? "bg-purple-500/20 text-purple-300 font-medium"
                  : "text-neutral-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-purple-400" />
                <span>Admin</span>
              </div>
              {normalizedRole === "admin" && (
                <span className="text-[10px] text-purple-400">Current</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
