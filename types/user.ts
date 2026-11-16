// Single Source of Truth for User Models & Roles in HireLoop

export type UserRole = "seeker" | "recruiter" | "admin"
export type UserAccountStatus = "active" | "suspended"

export interface AdminUserItem {
  _id: string
  name: string
  email: string
  role?: UserRole
  emailVerified?: boolean
  status?: UserAccountStatus
  createdAt: string
  updatedAt?: string
  image?: string
}

export interface UserStats {
  totalUsers: number
  recruiterCount: number
  suspendedCount: number
  newSignupsCount: number
}
