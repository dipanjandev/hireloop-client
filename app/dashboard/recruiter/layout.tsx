import { requiredRole } from "@/lib/core/server"
import React from "react"

const RecruiterLayout = async ({ children }: { children: React.ReactNode }) => {
  await requiredRole("recruiter")
  return children
}

export default RecruiterLayout
