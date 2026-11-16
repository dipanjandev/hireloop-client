import React from "react"
import Link from "next/link"
import { getJobById, getApplicationsCount } from "@/lib/api/jobs"
import DeleteButton from "@/components/DeleteButton"
import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  Globe2,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Pencil,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  FileText,
  GraduationCap,
  Layers,
  ChevronRight,
} from "lucide-react"

interface RecruiterJobDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function RecruiterJobDetailsPage({
  params,
}: RecruiterJobDetailsPageProps) {
  const { id } = await params

  // জব ডাটা ও রিয়েল-টাইম অ্যাপ্লিক্যান্ট সংখ্যা ফেচ করা
  const [job, applicantsData] = await Promise.all([
    getJobById(id),
    getApplicationsCount(`jobId=${id}`).catch(() => ({ count: 0 })),
  ])

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

  // অ্যাপ্লিক্যান্ট সংখ্যা (রিয়েল-টাইম অথবা জবের ডিফল্ট)
  const totalApplicants = applicantsData?.count ?? job.applicantsCount ?? 0

  // বুলেট পয়েন্ট লিস্ট তৈরি
  const responsibilitiesList = job.responsibilities
    ? job.responsibilities
        .split("\n")
        .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean)
    : []

  const qualificationsList = job.qualifications
    ? job.qualifications
        .split("\n")
        .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean)
    : []

  const isActive = job.status === "active"

  return (
    <div className="min-h-screen w-full bg-[#08080c] px-4 py-6 text-neutral-100 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ======================================================== */}
        {/* ১. টপ নেভিগেশন ও অ্যাকশন বার */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
          {/* ব্রেডক্রাম্ব ও ব্যাক লিংক */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/recruiter/jobs"
              className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0d0d14] text-neutral-400 transition-colors hover:border-white/20 hover:bg-[#151522] hover:text-white"
              title="Back to Manage Jobs"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <Link
                  href="/dashboard/recruiter/jobs"
                  className="transition-colors hover:text-neutral-200"
                >
                  Manage Jobs
                </Link>
                <ChevronRight className="h-3 w-3 text-neutral-600" />
                <span className="max-w-50 truncate font-medium text-[#8a75ff] sm:max-w-none">
                  {job.title}
                </span>
              </div>
              <h1 className="text-lg font-bold text-white sm:text-xl">
                Job Details &amp; Overview
              </h1>
            </div>
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Candidates / Applications বাটন */}
            <Link
              href={`/dashboard/recruiter/jobs/${job._id}/applications`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#5851ff] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(88,81,255,0.4)] transition-all hover:bg-[#4942f2] active:scale-95"
            >
              <Users className="h-3.5 w-3.5" />
              <span>View Applicants ({totalApplicants})</span>
            </Link>

            {/* Edit Job বাটন */}
            <Link
              href={`/dashboard/recruiter/post-job?edit=${job._id}`}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-[#161622] px-3.5 py-2 text-xs font-medium text-neutral-200 transition-colors hover:border-white/20 hover:bg-[#202030] hover:text-white"
            >
              <Pencil className="h-3.5 w-3.5 text-[#8a75ff]" />
              <span>Edit</span>
            </Link>

            {/* Public Job Preview */}
            <Link
              href={`/browse-jobs/${job._id}`}
              target="_blank"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-[#161622] px-3.5 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-[#202030] hover:text-white"
              title="View public candidate page"
            >
              <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Candidate View</span>
            </Link>

            {/* Delete Job বাটন */}
            <DeleteButton job={job} />
          </div>
        </div>

        {/* ======================================================== */}
        {/* ২. মেইন হিরো কার্ড */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d14]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#5851ff]/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* কোম্পানি আইকন */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-[#1a1a24] to-[#12121a] text-xl font-bold text-[#8a75ff] shadow-inner sm:h-16 sm:w-16">
                <Building2 className="h-7 w-7" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-[#5851ff]/30 bg-[#5851ff]/10 px-2.5 py-0.5 text-xs font-semibold text-[#8b85ff]">
                    {job.category}
                  </span>
                  {job.department && (
                    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-neutral-300">
                      {job.department}
                    </span>
                  )}
                  {/* Status Badge */}
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                      Active Listing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/80 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                      Closed / Expired
                    </span>
                  )}
                </div>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {job.title}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400 sm:text-sm">
                  <span className="font-semibold text-neutral-200">
                    {job.companyName}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="flex items-center gap-1.5">
                    {job.isRemote ? (
                      <Globe2 className="h-3.5 w-3.5 text-neutral-400" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    )}
                    <span>{job.location}</span>
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{job.jobType}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ৩. কিউ-মেট্রিক্স স্ট্যাটাস কার্ডস (৪ টি গ্রিড) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Compensation */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <span>Compensation</span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {job.compensation || "Competitive"}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              {job.frequency || "per month"}
            </p>
          </div>

          {/* Job Type */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Briefcase className="h-4 w-4 text-blue-400" />
              <span>Job Type</span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {job.jobType}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              {job.isRemote ? "Remote Friendly" : "On-site Position"}
            </p>
          </div>

          {/* Applicants */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Users className="h-4 w-4 text-[#8a75ff]" />
              <span>Applicants</span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {totalApplicants} Candidates
            </p>
            <Link
              href={`/dashboard/recruiter/jobs/${job._id}/applications`}
              className="mt-0.5 inline-block text-[11px] text-[#8a75ff] hover:underline"
            >
              Review Pipeline &rarr;
            </Link>
          </div>

          {/* Deadline */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <Calendar className="h-4 w-4 text-amber-400" />
              <span>Deadline</span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {job.deadlineFormatted || job.deadline}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              {job.postedTime || "Recently posted"}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ৪. ডিটেইলস কন্টেন্ট (২ কলাম লেআউট) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ================= বাম পাশ: রেসপনসিবিলিটি ও কোয়ালিফিকেশন (৮ কলাম) ================= */}
          <div className="space-y-6 lg:col-span-8">
            {/* Responsibilities */}
            <div className="rounded-3xl border border-white/10 bg-[#0d0d14]/90 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5851ff]/10 text-[#8a75ff]">
                  <FileText className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  Key Responsibilities
                </h3>
              </div>

              {responsibilitiesList.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {responsibilitiesList.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-xs leading-relaxed text-neutral-300 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-neutral-400 italic">
                  No specific responsibilities documented for this role.
                </p>
              )}
            </div>

            {/* Qualifications & Requirements */}
            <div className="rounded-3xl border border-white/10 bg-[#0d0d14]/90 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  Qualifications &amp; Requirements
                </h3>
              </div>

              {qualificationsList.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {qualificationsList.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-xs leading-relaxed text-neutral-300 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-neutral-400 italic">
                  No specific qualifications documented for this role.
                </p>
              )}
            </div>
          </div>

          {/* ================= ডান পাশ: রিক্রুটার সাইডবার ও অ্যাকশনস (৪ কলাম) ================= */}
          <div className="space-y-6 lg:col-span-4">
            {/* Candidate Pipeline Shortcut Card */}
            <div className="rounded-3xl border border-[#5851ff]/30 bg-linear-to-br from-[#121224] to-[#0d0d18] p-6 shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#8a75ff]" />
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                  Candidate Pipeline
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Review submitted applications, inspect resumes, and manage
                candidates for this role.
              </p>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-3.5">
                <div>
                  <div className="text-[11px] text-neutral-400">
                    Total Applicants
                  </div>
                  <div className="text-lg font-bold text-white">
                    {totalApplicants}
                  </div>
                </div>
                <Users className="h-8 w-8 text-neutral-600" />
              </div>

              <Link
                href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#4942f2] active:scale-95"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Review Applications</span>
              </Link>
            </div>

            {/* Posting Metadata Card */}
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#0d0d14]/90 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-300 uppercase">
                <Layers className="h-3.5 w-3.5 text-neutral-400" />
                <span>Posting Metadata</span>
              </h3>

              <div className="space-y-3 border-t border-white/5 pt-3 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">Recruiter</span>
                  <span
                    className="max-w-42.5 truncate font-medium text-neutral-200"
                    title={job.recruiterEmail}
                  >
                    {job.recruiterEmail}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">Department</span>
                  <span className="font-medium text-neutral-200">
                    {job.department || "General"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">Category</span>
                  <span className="font-medium text-neutral-200">
                    {job.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">Workplace</span>
                  <span className="font-medium text-neutral-200">
                    {job.isRemote ? "Remote" : "On-site"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">Listing Status</span>
                  <span className="font-medium text-emerald-400">
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Public Candidate Link */}
              <div className="border-t border-white/5 pt-4">
                <label className="mb-1.5 block text-[11px] font-medium text-neutral-400">
                  Public Candidate Listing URL
                </label>
                <Link
                  href={`/browse-jobs/${job._id}`}
                  target="_blank"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#12121c] p-2.5 text-xs text-blue-400 transition-colors hover:border-white/20 hover:text-blue-300"
                >
                  <span className="truncate">/browse-jobs/{job._id}</span>
                  <ExternalLink className="ml-1 h-3.5 w-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
