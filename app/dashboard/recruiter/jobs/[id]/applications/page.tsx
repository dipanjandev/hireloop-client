import React from "react"
import Link from "next/link"
import { getJobById, getApplications } from "@/lib/api/jobs"
import { JobApplication, ApplicationStatus } from "@/types/application"
import {
  ArrowLeft,
  Users,
  Mail,
  Calendar,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
} from "lucide-react"

interface JobApplicationsPageProps {
  params: Promise<{ id: string }>
}

// স্ট্যাটাস অনুযায়ী ব্যাজ স্টাইল হেল্পার
const getStatusConfig = (status?: ApplicationStatus | string) => {
  switch (status?.toLowerCase()) {
    case "shortlisted":
    case "accepted":
      return {
        label: "Shortlisted",
        classes: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        dot: "bg-emerald-400 shadow-[0_0_6px_#34d399]",
      }
    case "reviewing":
    case "interview":
      return {
        label: "In Review",
        classes: "border-amber-500/20 bg-amber-500/10 text-amber-400",
        dot: "bg-amber-400 shadow-[0_0_6px_#fbbf24]",
      }
    case "rejected":
      return {
        label: "Rejected",
        classes: "border-rose-500/20 bg-rose-500/10 text-rose-400",
        dot: "bg-rose-400",
      }
    case "applied":
    default:
      return {
        label: "Applied",
        classes: "border-blue-500/20 bg-blue-500/10 text-blue-400",
        dot: "bg-blue-400 shadow-[0_0_6px_#60a5fa]",
      }
  }
}

// নাম থেকে অ্যাভাটার ইনিশিয়াল হেল্পার
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
  return "JS"
}

// তারিখ ফরম্যাট হেল্পার
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Recently"
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

export default async function JobApplicationsPage({
  params,
}: JobApplicationsPageProps) {
  const { id } = await params

  // জব ও অ্যাপ্লিক্যান্টস ডাটা ফেচিং
  const [job, rawApplications] = await Promise.all([
    getJobById(id),
    getApplications(`jobId=${id}`).catch(() => []),
  ])

  // console.log("Applicant List", rawApplications)

  const applications: JobApplication[] = Array.isArray(rawApplications)
    ? rawApplications
    : []

  // মেম্বর মেট্রিক্স ক্যালকুলেশন
  const totalCount = applications.length
  const newSubmissionsCount = applications.filter(
    (a) => !a.status || a.status === "applied"
  ).length
  const reviewedCount = applications.filter(
    (a) =>
      a.status === "reviewing" ||
      a.status === "interview" ||
      a.status === "shortlisted"
  ).length

  // যদি জব না পাওয়া যায়
  if (!job) {
    return (
      <div className="min-h-screen w-full bg-[#08080c] px-4 py-16 text-neutral-100 sm:px-8">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-8 text-center backdrop-blur-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
            <Briefcase className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-white">Job Not Found</h2>
          <p className="mt-2 text-xs text-neutral-400">
            The job listing with ID &quot;{id}&quot; does not exist or may have
            been deleted.
          </p>
          <Link
            href="/dashboard/recruiter/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5851ff] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4942f2]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Manage Jobs</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#08080c] px-3 py-6 text-neutral-100 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ======================================================== */}
        {/* ১. টপ হেডার ও ব্রেডক্রাম্ব নেভিগেশন */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Link
              href={`/dashboard/recruiter/jobs/${job._id}`}
              className="group flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0d0d14] text-neutral-400 transition-colors hover:border-white/20 hover:bg-[#151522] hover:text-white"
              title="Back to Job Details"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>

            <div>
              {/* ব্রেডক্রাম্ব */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
                <Link
                  href="/dashboard/recruiter/jobs"
                  className="transition-colors hover:text-neutral-200"
                >
                  Manage Jobs
                </Link>
                <ChevronRight className="h-3 w-3 text-neutral-600" />
                <Link
                  href={`/dashboard/recruiter/jobs/${job._id}`}
                  className="max-w-37.5 truncate transition-colors hover:text-neutral-200 sm:max-w-none"
                >
                  {job.title}
                </Link>
                <ChevronRight className="h-3 w-3 text-neutral-600" />
                <span className="font-medium text-[#8a75ff]">Candidates</span>
              </div>

              {/* মেইন টাইটেল ও সাবটাইটেল */}
              <h1 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Candidate Applications
              </h1>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                Review submitted profiles, resumes, and manage candidates for{" "}
                <span className="font-semibold text-neutral-200">
                  {job.title}
                </span>
                .
              </p>
            </div>
          </div>

          {/* জব ইনফো ব্যাজ ও পাবলিক ভিউ লিংক */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#12121c] px-3 py-1 text-xs font-medium text-neutral-300">
              <Building2 className="h-3.5 w-3.5 text-neutral-500" />
              <span>{job.companyName}</span>
            </span>

            <Link
              href={`/browse-jobs/${job._id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#161622] px-3.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-[#202030] hover:text-white"
              title="Open public job post"
            >
              <span>View Job Post</span>
              <ExternalLink className="h-3 w-3 text-neutral-400" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ২. ক্যান্ডিডেট মেট্রিক্স কুইক সামারি বার (৩ টি কার্ড) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Total Applicants */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">
                Total Applicants
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5851ff]/10 text-[#8a75ff]">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">
              {totalCount}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              Submitted applications
            </p>
          </div>

          {/* New / Under Review */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">
                New Submissions
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-blue-400">
              {newSubmissionsCount}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              Pending initial screening
            </p>
          </div>

          {/* Shortlisted / Interviewing */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">
                In Review / Shortlisted
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-400">
              {reviewedCount}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              Advanced candidate pipeline
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ৩. ক্যান্ডিডেট তালিকা টেবিল */}
        {/* ======================================================== */}
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/90 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#12121c]/70 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#8a75ff]" />
              <h2 className="text-sm font-semibold text-white">
                Candidate Pipeline ({applications.length})
              </h2>
            </div>
          </div>

          {/* টেবিল কনটেইনার */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#12121c]/40 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                  <th scope="col" className="px-4 py-3.5 sm:px-6">
                    Candidate
                  </th>
                  <th scope="col" className="px-4 py-3.5 sm:px-6">
                    Email Address
                  </th>
                  <th scope="col" className="px-4 py-3.5 sm:px-6">
                    Applied Date
                  </th>
                  <th scope="col" className="px-4 py-3.5 sm:px-6">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {applications.map((app) => {
                  const statusConfig = getStatusConfig(app.status)
                  const initials = getInitials(app.applicantName, app.email)

                  return (
                    <tr
                      key={app._id}
                      className="group transition-colors duration-150 hover:bg-[#151522]/60"
                    >
                      {/* ১. CANDIDATE PROFILE */}
                      <td className="px-4 py-3.5 sm:px-6">
                        <div className="flex items-center gap-3">
                          {/* Avatar Circle with Initials */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-[#5851ff]/20 to-[#1e1e30] text-xs font-bold text-[#a594ff] shadow-sm">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-white transition-colors group-hover:text-[#a594ff]">
                              {app.applicantName || "Job Seeker Candidate"}
                            </div>
                            <div className="mt-0.5 font-mono text-[11px] text-neutral-500">
                              ID: {app.userId?.slice(-6) || "seeker"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ২. EMAIL ADDRESS */}
                      <td className="px-4 py-3.5 whitespace-nowrap sm:px-6">
                        <a
                          href={`mailto:${app.email}`}
                          className="inline-flex items-center gap-1.5 text-neutral-300 transition-colors hover:text-white hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                          <span>{app.email}</span>
                        </a>
                      </td>

                      {/* ৩. APPLIED DATE */}
                      <td className="px-4 py-3.5 whitespace-nowrap sm:px-6">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                          <span>{formatDate(app.appliedAt)}</span>
                        </div>
                      </td>

                      {/* ৪. STATUS BADGE */}
                      <td className="px-4 py-3.5 whitespace-nowrap sm:px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusConfig.classes}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                          />
                          {statusConfig.label}
                        </span>
                      </td>

                      {/* ৫. ACTIONS */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap sm:px-6">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* Send Email */}
                          <a
                            href={`mailto:${app.email}?subject=Application for ${encodeURIComponent(job.title)}`}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-[#171724] px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-[#5851ff]/40 hover:bg-[#202034] hover:text-white"
                            title={`Send email to ${app.email}`}
                          >
                            <Mail className="h-3 w-3 text-[#8a75ff]" />
                            <span className="hidden sm:inline">Contact</span>
                          </a>

                          {/* View Application Details */}
                          <button
                            type="button"
                            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-[#171724] px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-blue-500/40 hover:bg-[#1e1e32] hover:text-white"
                            title="Candidate details"
                          >
                            <CheckCircle2 className="h-3 w-3 text-blue-400" />
                            <span>Review</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* ৪. এম্পটি স্টেট (যদি এখনো কোনো ক্যান্ডিডেট এপ্লাই না করে থাকে) */}
          {applications.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
                <Users className="h-7 w-7 text-neutral-500" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                No applications received yet
              </h3>
              <p className="mt-1.5 max-w-sm text-xs text-neutral-400">
                Candidates who apply to &quot;{job.title}&quot; will appear
                here. Share your job posting link with candidates to get more
                visibility.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/browse-jobs/${job._id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#5851ff] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#4942f2]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Public Listing</span>
                </Link>
                <Link
                  href={`/dashboard/recruiter/jobs/${job._id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#161622] px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:bg-[#202030] hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Job Details</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
