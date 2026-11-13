import React from "react"
import Link from "next/link"
import NavBar from "@/components/homepage-components/NavBar"
import { getJobById } from "@/lib/api/jobs"
import {
  ArrowLeft,
  Banknote,
  Bookmark,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Globe2,
  Laptop,
  MapPin,
  Palmtree,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import ApplyButton from "@/components/jobByIdPage/ApplyButton"

interface JobDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params
  const job = await getJobById(id)

  // ১. জব পাওয়া না গেলে ফ্রেন্ডলি এম্পটি স্টেট
  if (!job) {
    return (
      <div className="min-h-screen w-full bg-[#08080c] text-neutral-100">
        <NavBar />
        <main className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
            <Briefcase className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            Job Posting Not Found
          </h1>
          <p className="mt-2 max-w-md text-sm text-neutral-400">
            The job listing you are looking for may have expired, been removed,
            or is currently unavailable.
          </p>
          <Link
            href="/browse-jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5851ff] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#4942f2]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse All Jobs</span>
          </Link>
        </main>
      </div>
    )
  }

  // টেক্সট থেকে বুলেট পয়েন্ট তৈরি করার হেল্পার
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

  return (
    <div className="min-h-screen w-full bg-[#08080c] text-neutral-100">
      {/* টপ ন্যাভবার */}
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ব্যাক বাটন / ব্রেডক্রাম্ব */}
        <div className="mb-6">
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-white sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all jobs</span>
          </Link>
        </div>

        {/* সেকশন ১: টপ হেডার কার্ড (ফিগমা স্ক্রিনশটের হুবহু ডিজাইন) */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-[#0e0e15]/90 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex-row sm:items-center sm:p-8">
          {/* কোম্পানি লোগো ও টাইটেল */}
          <div className="flex items-start gap-4 sm:items-center sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-[#1a1a24] to-[#12121a] text-xl font-bold text-[#8a75ff] shadow-inner sm:h-16 sm:w-16">
              <Building2 className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                {job.title}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-neutral-200">
                  {job.companyName}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Employer</span>
                </span>
              </div>
            </div>
          </div>

          {/* বুকমার্ক ও এপ্লাই নাও বাটন */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* বুকমার্ক বাটন */}
            <button
              type="button"
              aria-label="Bookmark this job"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Bookmark className="h-4 w-4" />
            </button>

            {/* এপ্লাই বাটন কম্পোনেন্ট এর মাধ্যমে আনা হয়েছে। */}
            <ApplyButton job={job} />
          </div>
        </div>

        {/* ======================================================== */}
        {/* সেকশন ২: ৪টি কুইক ইনফো মেট্রিক্স কার্ড (Horizontal Row) */}
        {/* ======================================================== */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* ১. স্যালারি রেঞ্জ */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e15]/80 p-4.5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
              <Banknote className="h-3.5 w-3.5 text-neutral-500" />
              <span>Salary Range</span>
            </div>
            <div className="mt-1.5 truncate text-sm font-bold text-white sm:text-base">
              {job.compensation || "Competitive"}
            </div>
          </div>

          {/* ২. লোকেশন */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e15]/80 p-4.5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
              <MapPin className="h-3.5 w-3.5 text-neutral-500" />
              <span>Location</span>
            </div>
            <div className="mt-1.5 truncate text-sm font-bold text-white sm:text-base">
              {job.location || "Worldwide"}
              {job.isRemote &&
                !job.location.toLowerCase().includes("remote") &&
                " (Remote)"}
            </div>
          </div>

          {/* ৩. জব টাইপ */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e15]/80 p-4.5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
              <Clock className="h-3.5 w-3.5 text-neutral-500" />
              <span>Job Type</span>
            </div>
            <div className="mt-1.5 truncate text-sm font-bold text-white sm:text-base">
              {job.jobType || "Full-time"}
            </div>
          </div>

          {/* ৪. ক্যাটাগরি / ডিপার্টমেন্ট */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e15]/80 p-4.5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
              <Briefcase className="h-3.5 w-3.5 text-neutral-500" />
              <span>Category</span>
            </div>
            <div className="mt-1.5 truncate text-sm font-bold text-white sm:text-base">
              {job.category || job.department || "Technology"}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* সেকশন ৩: মূল কন্টেন্ট (বামে ডিটেইলস, ডানে কোম্পানি ওভারভিউ) */}
        {/* ======================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {/* ================= বাম কলাম: মূল জব বিবরণী (২ কলাম) ================= */}
          <div className="space-y-8 rounded-2xl border border-white/10 bg-[#0e0e15]/90 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8 lg:col-span-2">
            {/* ১. Job Description */}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Job Description
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                At {job.companyName}, we are actively expanding our team with
                exceptional talent. As a {job.title}, you will collaborate
                closely with cross-functional teams to build, scale, and
                optimize innovative products that solve real-world problems.
              </p>
            </div>

            <div className="border-t border-white/5" />

            {/* ২. Responsibilities */}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Responsibilities
              </h2>
              <ul className="mt-4 space-y-3">
                {responsibilitiesList.length > 0 ? (
                  responsibilitiesList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a75ff]" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-neutral-400">
                    Detailed responsibilities will be discussed during the
                    interview process.
                  </p>
                )}
              </ul>
            </div>

            <div className="border-t border-white/5" />

            {/* ৩. Requirements */}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Requirements
              </h2>

              {/* স্কিল ব্যাজসমূহ */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300">
                  <Sparkles className="h-3 w-3 text-[#8a75ff]" />
                  <span>{job.category}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300">
                  <Clock className="h-3 w-3 text-blue-400" />
                  <span>{job.jobType}</span>
                </span>
                {job.isRemote && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                    <Globe2 className="h-3 w-3" />
                    <span>Remote Friendly</span>
                  </span>
                )}
              </div>

              {/* কুয়ালিফিকেশন লিস্ট */}
              <ul className="mt-4 space-y-3">
                {qualificationsList.length > 0 ? (
                  qualificationsList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a75ff]" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-neutral-400">
                    General domain knowledge and passion for high performance.
                  </p>
                )}
              </ul>
            </div>

            <div className="border-t border-white/5" />

            {/* ৪. Benefits (স্ক্রিনশটের 2x2 গ্রিড) */}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Benefits
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm font-medium text-neutral-200">
                    Full Health & Dental
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                  <Banknote className="h-5 w-5 shrink-0 text-[#8a75ff]" />
                  <span className="text-sm font-medium text-neutral-200">
                    Competitive 401(k) Matching
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                  <Laptop className="h-5 w-5 shrink-0 text-cyan-400" />
                  <span className="text-sm font-medium text-neutral-200">
                    Latest Hardware & Tech Stipend
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                  <Palmtree className="h-5 w-5 shrink-0 text-orange-400" />
                  <span className="text-sm font-medium text-neutral-200">
                    Unlimited Paid Time Off (PTO)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ডান কলাম: Company Overview (১ কলাম) ================= */}
          <div className="h-fit rounded-2xl border border-white/10 bg-[#0e0e15]/90 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-7 lg:col-span-1">
            <h2 className="border-b border-white/10 pb-4 text-lg font-bold tracking-tight text-white">
              Company Overview
            </h2>

            {/* কোম্পানির তথ্যাবলী (ছবি ছাড়া ক্লিন ও সিম্পল) */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-400">Company Name</span>
                <span className="font-semibold text-white">
                  {job.companyName}
                </span>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-400">Company Size</span>
                <span className="font-medium text-neutral-200">
                  250 - 500 Employees
                </span>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-400">Industry</span>
                <span className="font-medium text-neutral-200">
                  {job.category}
                </span>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-400">Workplace</span>
                <span className="font-medium text-neutral-200">
                  {job.isRemote ? "Remote First" : "On-site / Hybrid"}
                </span>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-400">Application Deadline</span>
                <span className="font-medium text-neutral-200">
                  {job.deadlineFormatted || job.deadline || "Open"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
