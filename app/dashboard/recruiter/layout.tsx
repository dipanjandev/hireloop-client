import { getSession } from "@/lib/core/server"
import { redirect } from "next/navigation"
import React from "react"

const RecruiterLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  const role = session?.user?.role

  if (role !== "recruiter" && role !== "admin") {
    redirect("/unauthorized")
  }

  return children
}

export default RecruiterLayout
