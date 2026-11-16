import React from "react"
import { UserStats } from "@/types/user"

interface UserStatsCardsProps {
  stats: UserStats
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* ১. Total Active Users */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-5 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-white/15">
        <div className="text-xs font-medium text-neutral-400">
          Total Active Users
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {stats.totalUsers.toLocaleString()}
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-400">
          <span>+12% vs last month</span>
        </div>
      </div>

      {/* ২. Recruiter Growth */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-5 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-white/15">
        <div className="text-xs font-medium text-neutral-400">
          Recruiter Growth
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {stats.recruiterCount.toLocaleString()}
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-400">
          <span>High demand</span>
        </div>
      </div>

      {/* ৩. Suspended Accounts */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-5 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-white/15">
        <div className="text-xs font-medium text-neutral-400">
          Suspended Accounts
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {stats.suspendedCount.toLocaleString()}
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-neutral-500">
          <span>0.8% of total</span>
        </div>
      </div>

      {/* ৪. New Signups (24h) */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-5 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-white/15">
        <div className="text-xs font-medium text-neutral-400">
          New Signups (24h)
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {stats.newSignupsCount.toLocaleString()}
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-amber-400">
          <span>Steady activity</span>
        </div>
      </div>
    </div>
  )
}
