"use client"

import React from "react"
import { User, Briefcase, ShieldAlert } from "lucide-react"
import { UserRole } from "@/types/user"

interface RoleBadgeProps {
  role?: UserRole | string
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const normalizedRole = role?.toLowerCase()

  if (normalizedRole === "recruiter") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
        <Briefcase className="h-3 w-3" />
        <span>Recruiter</span>
      </span>
    )
  }

  if (normalizedRole === "admin") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
        <ShieldAlert className="h-3 w-3" />
        <span>Admin</span>
      </span>
    )
  }

  // Default: Seeker
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/80 px-2.5 py-1 text-xs font-medium text-neutral-300">
      <User className="h-3 w-3 text-neutral-400" />
      <span>Seeker</span>
    </span>
  )
}
