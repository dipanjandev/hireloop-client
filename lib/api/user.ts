import { headers } from "next/headers"
import { auth } from "../auth"
import { AdminUserItem } from "@/types/user"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// ১. Better-Auth এডমিন API দিয়ে ইউজার ফেচ করা
export const getUser = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "desc",
    },
    headers: await headers(),
  })
  return users
}

// ২. ডাটাবেজ থেকে সরাসরি সকল ইউজার তালিকা আনার জন্য (GET /users)
export const getAllUsers = async (): Promise<AdminUserItem[]> => {
  try {
    const res = await fetch(`${BASE_URL}/users`, { cache: "no-store" })
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return []
  }
}

// ৩. ইউজারের প্রিমিয়াম স্ট্যাটাস যাচাইয়ের API
export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return response.json()
}
