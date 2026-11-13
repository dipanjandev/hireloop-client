"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DisplayApplicationItem } from "@/types/application"
import ApplicationHeader from "@/components/seeker-applications/ApplicationHeader"
import ApplicationStats from "@/components/seeker-applications/ApplicationStats"
import ApplicationFilterTabs from "@/components/seeker-applications/ApplicationFilterTabs"
import ApplicationCard from "@/components/seeker-applications/ApplicationCard"
import { useRouter } from "next/navigation"

// ফিগমা স্ক্রিনশটের হুবহু ডামি ডাটা তালিকা
const INITIAL_APPLICATIONS: DisplayApplicationItem[] = [
  {
    _id: "app-1",
    jobId: "job-101",
    jobTitle: "Senior Product Designer",
    companyName: "TechFlow Systems",
    companyTag: "TECHFLOW",
    location: "San Francisco, CA (Hybrid)",
    salary: "$160k - $200k + Equity",
    jobType: "Full-time",
    status: "applied",
    appliedAt: "2026-11-13T18:00:00.000Z",
    appliedTimeFormatted: "Saved 2 hours ago",
    closesInText: "Closes in 3 days",
    isSaved: true,
  },
  {
    _id: "app-2",
    jobId: "job-102",
    jobTitle: "Frontend Engineer",
    companyName: "Vercel",
    companyTag: "VERCEL",
    location: "Remote, Global",
    salary: "$140k - $180k",
    jobType: "Full-time",
    status: "applied",
    appliedAt: "2026-11-12T10:00:00.000Z",
    appliedTimeFormatted: "Saved yesterday",
    isSaved: true,
  },
  {
    _id: "app-3",
    jobId: "job-103",
    jobTitle: "Staff UX Researcher",
    companyName: "Linear App",
    companyTag: "LINEAR",
    location: "New York, NY (On-site)",
    salary: "$180k - $220k",
    jobType: "Full-time",
    status: "draft",
    appliedAt: "2026-11-10T14:00:00.000Z",
    appliedTimeFormatted: "Saved 3 days ago",
    isSaved: true,
  },
  {
    _id: "app-4",
    jobId: "job-104",
    jobTitle: "Full Stack Developer",
    companyName: "Meta",
    companyTag: "META",
    location: "Menlo Park, CA (Hybrid)",
    salary: "$150k - $210k + Bonus",
    jobType: "Full-time",
    status: "applied",
    appliedAt: "2026-11-08T09:00:00.000Z",
    appliedTimeFormatted: "Saved 5 days ago",
    isSaved: true,
  },
  {
    _id: "app-5",
    jobId: "job-105",
    jobTitle: "Design Systems Lead",
    companyName: "Spotify",
    companyTag: "SPOTIFY",
    location: "Remote, USA",
    salary: "$170k - $220k",
    jobType: "Full-time",
    status: "withdrawn",
    appliedAt: "2026-11-05T12:00:00.000Z",
    appliedTimeFormatted: "Closed yesterday",
    isClosed: true,
    isSaved: true,
  },
]

export default function SeekerApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] =
    useState<DisplayApplicationItem[]>(INITIAL_APPLICATIONS)

  // হ্যান্ডলার: জবে সরাসরি এপ্লাই বা ডিটেইলসে যাওয়া
  const handleApply = (jobId: string) => {
    router.push(`/browse-jobs/${jobId}`)
  }

  // হ্যান্ডলার: লিস্ট থেকে রিমুভ করা
  const handleRemove = (appId: string) => {
    setApplications((prev) => prev.filter((item) => item._id !== appId))
  }

  return (
    <div className="min-h-screen w-full bg-[#08080c] px-4 py-6 text-neutral-100 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ১. টপ হেডার (সার্চ বার + রেজ্যুমে আপলোড বাটন) */}
        <ApplicationHeader />

        {/* ২. মেইন টাইটেল এবং মেট্রিক্স কাউন্টার সেকশন */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Saved Jobs
            </h1>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              Manage and track your bookmarked opportunities.
            </p>
          </div>

          {/* ডানপাশের ২টা স্ট্যাটাস মেট্রিক্স কার্ড */}
          <ApplicationStats
            totalCount={24}
            closingSoonCount={3}
            totalLabel="Total Saved"
            closingSoonLabel="Closing Soon"
          />
        </div>

        {/* ৩. ফিল্টার ট্যাব এবং সর্টিং ড্রপডাউন */}
        <ApplicationFilterTabs />

        {/* ৪. জব অ্যাপ্লিকেশন / সেভড জবস কার্ড তালিকা */}
        <div className="space-y-4">
          {applications.map((item) => (
            <ApplicationCard
              key={item._id}
              application={item}
              onApply={handleApply}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* ৫. লোড মোর বাটন (স্ক্রিনশটের হুবহু নিচে) */}
        <div className="flex justify-center pt-4 pb-8">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-[#121217] px-6 py-2.5 text-xs font-semibold text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white sm:text-sm"
          >
            <span>Load More</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
