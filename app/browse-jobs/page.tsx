import React from "react"
import NavBar from "@/components/homepage-components/NavBar"
import { getJobs } from "@/lib/api/jobs"
import JobSearchBar from "@/components/browse-jobs/JobSearchBar"
import JobFiltersSidebar from "@/components/browse-jobs/JobFiltersSidebar"
import JobCard from "@/components/browse-jobs/JobCard"
import JobPagination from "@/components/browse-jobs/JobPagination"
import { Briefcase, ChevronDown } from "lucide-react"

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()
  const jobs = await getJobs(query)

  return (
    <div className="min-h-screen w-full bg-[#08080c] text-neutral-100">
      {/* ১. টপ নেভবার */}
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ২. ফুল-উইডথ সার্চ বার */}
        <div className="mb-10">
          <JobSearchBar />
        </div>

        {/* ৩. মেইন কন্টেন্ট: বামে ফিল্টার সাইডবার, ডানে রেজাল্টস */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* ফিল্টার সাইডবার */}
          <div className="w-full shrink-0 lg:w-72">
            <JobFiltersSidebar />
          </div>

          {/* জব লিস্ট সেকশন */}
          <section className="flex-1">
            {/* হেডার: কাউন্ট এবং সর্টিং */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Found{" "}
                <span className="text-[#8a75ff]">
                  {jobs && jobs.length > 0 ? jobs.length : 0}
                </span>{" "}
                Professional Jobs
              </h1>

              {/* সর্ট ড্রপডাউন */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-neutral-400">Sort by:</span>
                <div className="relative inline-flex items-center">
                  <select
                    defaultValue="recent"
                    className="cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#121217] py-1.5 pr-8 pl-3 text-xs font-semibold text-neutral-200 transition-colors focus:border-[#5851ff] focus:outline-none sm:text-sm"
                  >
                    <option value="recent" className="bg-[#121217]">
                      Most Recent
                    </option>
                    <option value="salary" className="bg-[#121217]">
                      Highest Salary
                    </option>
                    <option value="popular" className="bg-[#121217]">
                      Most Popular
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-neutral-400" />
                </div>
              </div>
            </div>

            {/* জব কার্ড তালিকা */}
            {jobs && jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              /* এম্পটি স্টেট (যদি ডাটা না থাকে) */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0e0e15]/50 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  No job postings available
                </h3>
                <p className="mt-1 text-xs text-neutral-400">
                  Try clearing or adjusting your search filters.
                </p>
              </div>
            )}

            {/* ৪. পেজিনেশন */}
            {jobs && jobs.length > 0 && <JobPagination />}
          </section>
        </div>
      </main>
    </div>
  )
}

export default BrowseJobs
