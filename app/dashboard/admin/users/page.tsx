import { getUser } from "@/lib/api/user"
import React from "react"

const AdminUsersPage = () => {
  // এখানে আমরা ইউজারদের দেখতে পারব।
  const users = getUser()
  console.log("users console", users)

  return (
    <div>
      <h3>This is User Management Pages.</h3>
    </div>
  )
}

export default AdminUsersPage
