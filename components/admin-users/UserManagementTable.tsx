"use client"

import React, { useState, useMemo } from "react"
import { Search, ChevronDown, Download, Filter, UserX } from "lucide-react"
import { AdminUserItem, UserRole } from "@/types/user"
import { RoleBadge } from "./RoleBadge"
import { RoleToggleButton } from "./RoleToggleButton"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { updateUsersRole } from "@/lib/actions/better-auth-users"

interface UserManagementTableProps {
  users: AdminUserItem[]
  onRoleUpdate?: (userId: string, newRole: UserRole) => void
}

// নাম থেকে ইনিশিয়াল বের করার ফাংশন
const getInitials = (name?: string, email?: string) => {
  if (name && name.trim()) {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  if (email) {
    return email.slice(0, 2).toUpperCase()
  }
  return "U"
}

// তারিখ ফরম্যাট
const formatJoinDate = (dateStr?: string) => {
  if (!dateStr) return "Oct 12, 2023"
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
}) => {
  // ১. সার্চ ও ফিল্টার স্টেট
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()

  // =========================================================================
  // 👉 Role আপডেট করার ইভেন্ট হ্যান্ডলার
  // নির্দেশনামতে এখানে কোনো ইন্টারনাল লজিক রাখা হয়নি।
  // পরবর্তীতে আপনি এখানে আপনার API বা সার্ভার অ্যাকশন বসাবেন।
  // =========================================================================
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const res = await updateUsersRole(userId, newRole)
    // console.log("respone after update", res)
    if (res.modifiedCount > 0) {
      toast.success("Role Updated Successfully!")
      router.refresh()
    }
  }

  // ফিল্টার করা ইউজারদের তালিকা
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // রোল ফিল্টার
      const userRole = (user.role || "seeker").toLowerCase()
      if (selectedRole !== "all" && userRole !== selectedRole) {
        return false
      }

      // সার্চ কুয়েরি ফিল্টার (ইমেইল বা নাম)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        const matchesName = user.name?.toLowerCase().includes(query)
        const matchesEmail = user.email?.toLowerCase().includes(query)
        return matchesName || matchesEmail
      }

      return true
    })
  }, [users, selectedRole, searchQuery])

  // রোল ফিল্টারের লেবেল
  const getRoleFilterLabel = (role: string) => {
    if (role === "seeker") return "Seekers"
    if (role === "recruiter") return "Recruiters"
    if (role === "admin") return "Admins"
    return "All Roles"
  }

  return (
    <div className="space-y-4">
      {/* ======================================================== */}
      {/* কন্ট্রোল বার: সার্চ, রোল ফিল্টার ড্রপডাউন ও এক্সপোর্ট বাটন */}
      {/* ======================================================== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by email..."
            className="h-10 w-full rounded-xl border border-white/10 bg-[#0d0d14]/90 pr-4 pl-10 text-xs text-neutral-200 placeholder-neutral-500 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
          />
        </div>

        {/* ডানপাশের কন্ট্রোলস: ফিল্টার ও এক্সপোর্ট */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Role Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-[#0d0d14]/90 px-3.5 text-xs font-medium text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <Filter className="h-3.5 w-3.5 text-neutral-400" />
              <span>{getRoleFilterLabel(selectedRole)}</span>
              <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
            </button>

            {isFilterOpen && (
              <div className="absolute top-11 right-0 z-50 w-36 rounded-xl border border-white/10 bg-[#12121a] p-1 shadow-2xl backdrop-blur-2xl">
                {["all", "seeker", "recruiter", "admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role)
                      setIsFilterOpen(false)
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      selectedRole === role
                        ? "bg-[#5851ff]/20 font-medium text-[#8b85ff]"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{getRoleFilterLabel(role)}</span>
                    {selectedRole === role && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5851ff]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export List Button (স্ক্রিনশটের মতো সাদা ব্যাকগ্রাউন্ড) */}
          <button
            type="button"
            onClick={() => {
              // এক্সপোর্ট হ্যান্ডলার
              console.log("Export user list triggered")
            }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-white px-4 text-xs font-semibold text-neutral-950 shadow-sm transition-all hover:bg-neutral-200 active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export List</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ইউজার টেবিল কনটেইনার (Dark Glassmorphism) */}
      {/* ======================================================== */}
      <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/90 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            {/* টেবিল হেডার */}
            <thead>
              <tr className="border-b border-white/10 bg-[#12121c]/70 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                <th scope="col" className="px-5 py-4">
                  User Name
                </th>
                <th scope="col" className="px-5 py-4">
                  Email Address
                </th>
                <th scope="col" className="px-5 py-4">
                  Role
                </th>
                <th scope="col" className="px-5 py-4">
                  Join Date
                </th>
                <th scope="col" className="px-5 py-4">
                  Status
                </th>
                <th scope="col" className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* টেবিল বডি */}
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => {
                const initials = getInitials(user.name, user.email)
                const isSuspended = user.status === "suspended"

                return (
                  <tr
                    key={user._id}
                    className="group transition-colors duration-150 hover:bg-[#151522]/60"
                  >
                    {/* ১. USER NAME & AVATAR */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {/* Circular Avatar */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-[#1a1a28] to-[#111118] text-xs font-bold text-neutral-200 shadow-sm">
                          {initials}
                        </div>
                        <div className="font-semibold text-white transition-colors group-hover:text-[#a594ff]">
                          {user.name || "HireLoop User"}
                        </div>
                      </div>
                    </td>

                    {/* ২. EMAIL ADDRESS */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs text-neutral-400">
                        {user.email}
                      </span>
                    </td>

                    {/* ৩. ROLE BADGE */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <RoleBadge role={user.role} />
                    </td>

                    {/* ৪. JOIN DATE */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-xs text-neutral-400">
                        {formatJoinDate(user.createdAt)}
                      </span>
                    </td>

                    {/* ৫. STATUS */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {isSuspended ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                          Active
                        </span>
                      )}
                    </td>

                    {/* ৬. ACTIONS */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-3">
                        {/* ১. Role Toggle Button */}
                        <RoleToggleButton
                          userId={user._id}
                          currentRole={user.role}
                          onRoleChange={handleRoleChange}
                        />

                        {/* ২. Suspend / Activate Button */}
                        {isSuspended ? (
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Activate user clicked:", user._id)
                            }}
                            className="cursor-pointer text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-300 hover:underline"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Suspend user clicked:", user._id)
                            }}
                            className="cursor-pointer text-xs font-medium text-rose-400 transition-colors hover:text-rose-300 hover:underline"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* এম্পটি স্টেট (যদি কোনো ইউজার না পাওয়া যায়) */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
              <UserX className="h-6 w-6 text-neutral-500" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              No users found
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              {searchQuery
                ? `No user accounts matched "${searchQuery}".`
                : "No users currently match the selected role filter."}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 cursor-pointer text-xs font-medium text-[#8a75ff] hover:underline"
              >
                Clear search query
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
