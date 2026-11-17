"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { updateApplications } from "@/lib/actions/applications"

interface Props {
  applicationId: string
  currentStatus?: string
}

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "reviewing", label: "In Review" },
  { value: "interview", label: "Interview" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
]

const ApplicationStatusSelect = ({
  applicationId,
  currentStatus = "applied",
}: Props) => {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus.toLowerCase())
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus)
    setIsUpdating(true)

    try {
      const result = await updateApplications(applicationId, newStatus)
      // console.log(result)

      if (result.modifiedCount > 0) {
        toast.success(`Status updated to ${newStatus}`)
        router.refresh() // সার্ভার কম্পোনেন্টের ডাটা ও কাউন্টার রিফ্রেশ করবে
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select
      value={status}
      disabled={isUpdating}
      onChange={(e) => handleStatusChange(e.target.value)}
      className="cursor-pointer rounded-lg border border-white/10 bg-[#171724] px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-[#5851ff]/40 focus:border-[#5851ff] focus:outline-none disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="bg-[#12121c] text-white"
        >
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default ApplicationStatusSelect
