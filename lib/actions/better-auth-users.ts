"use server"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const updateUsersRole = async (
  userId: string,
  role: "seeker" | "recruiter" | "admin"
) => {
  const api = `${BASE_URL}/users/${userId}/role`
  // console.log("1. Calling API:", api, "with role:", role) // ✅ VS Code টার্মিনালে দেখবে
  const response = await protectedMutation(api, "PATCH", { role })
  // console.log("2. Backend Status:", response.status) // ✅ স্ট্যাটাস কোড (200, 401, নাকি 403) দেখবে
  // const text = await response.text() // সরাসরি .json() না করে আগে text নিয়ে দেখছি
  // console.log("3. Raw Response:", text)
  return response.json()
  // return JSON.parse(text)
}
