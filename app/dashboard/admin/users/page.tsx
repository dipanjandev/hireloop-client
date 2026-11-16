import { getAllUsers } from "@/lib/api/user"
import { AdminUserItem, UserStats } from "@/types/user"
import { UserStatsCards } from "@/components/admin-users/UserStatsCards"
import { UserManagementTable } from "@/components/admin-users/UserManagementTable"
import { Users, Bell, HelpCircle, ChevronDown } from "lucide-react"

export default async function AdminUsersPage() {
  // ১. ডাটাবেজ থেকে সমস্ত ইউজার তালিকা ফেচ করা
  const rawUsers = await getAllUsers()

  // রোল ও স্ট্যাটাস নরমালাইজেশন
  const users: AdminUserItem[] = rawUsers.map((u) => ({
    ...u,
    role: u.role || "seeker",
    status: u.status || "active",
  }))

  // ২. ইউজার স্ট্যাটিসটিক্স ক্যালকুলেশন
  const totalUsersCount = users.length
  const recruiterCount = users.filter((u) => u.role === "recruiter").length
  const suspendedCount = users.filter((u) => u.status === "suspended").length
  const newSignupsCount = 42

  const stats: UserStats = {
    totalUsers: totalUsersCount,
    recruiterCount: recruiterCount,
    suspendedCount: suspendedCount,
    newSignupsCount: newSignupsCount,
  }

  return (
    <div className="min-h-screen w-full bg-[#08080c] px-4 py-6 text-neutral-100 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ======================================================== */}
        {/* ১. টপ হেডার বার: টাইটেল, সাবটাইটেল ও কুইক টুলস */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#5851ff]/10 text-[#8a75ff]">
                <Users className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                Administration
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              User Management
            </h1>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              Review, filter, and manage platform access for all users.
            </p>
          </div>

          {/* হেডার রাইট টুলস (স্ক্রিনশটের মতো নোটিফিকেশন, হেল্প ও রোলস বাটন) */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0d0d14] text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#5851ff]" />
            </button>

            {/* Help Icon */}
            <button
              type="button"
              aria-label="Help"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0d0d14] text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            {/* Manage Roles Shortcut */}
            <button
              type="button"
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-[#0d0d14] px-3 text-xs font-medium text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <span>Manage Roles</span>
              <ChevronDown className="h-3 w-3 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ২. ৪টি সামারি মেট্রিক্স কার্ড (UserStatsCards) */}
        {/* ======================================================== */}
        <UserStatsCards stats={stats} />

        {/* ======================================================== */}
        {/* ৩. ইউজার ম্যানেজমেন্ট টেবিল ও কন্ট্রোলস (UserManagementTable) */}
        {/* ======================================================== */}
        <UserManagementTable users={users} />
      </div>
    </div>
  )
}
