import Link from "next/link"
import {
  Code2,
  Palette,
  Server,
  Megaphone,
  CheckCircle2,
  Users,
  MapPin,
  Globe2,
  Pencil,
  Plus,
  ChevronRight,
  Briefcase,
  Eye,
} from "lucide-react"
import { DisplayJobItem } from "@/types/job"
import { getJobs } from "@/lib/api/jobs"
import DeleteButton from "@/components/DeleteButton"
import { getSession } from "@/lib/core/server"

// ডিপার্টমেন্ট অনুযায়ী আইকন ও কালার হেল্পার
const getDeptConfig = (dept?: string) => {
  switch (dept?.toLowerCase()) {
    case "engineering":
      return {
        icon: Code2,
        badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        labelColor: "text-blue-400",
      }
    case "design":
      return {
        icon: Palette,
        badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        labelColor: "text-orange-400",
      }
    case "infrastructure":
      return {
        icon: Server,
        badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        labelColor: "text-cyan-400",
      }
    case "marketing":
      return {
        icon: Megaphone,
        badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        labelColor: "text-purple-400",
      }
    case "quality":
      return {
        icon: CheckCircle2,
        badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        labelColor: "text-indigo-400",
      }
    default:
      return {
        icon: Briefcase,
        badgeColor: "text-neutral-400 bg-white/5 border-white/10",
        labelColor: "text-neutral-400",
      }
  }
}

export default async function ManageJobsPage() {
  // রিকরুটারের নামে কতগুলো জব পোষ্ট হয়েছে সেটা এখানে দেখানো হবে।
  const session = await getSession()

  // ডাটা ফেচিং
  const jobs: DisplayJobItem[] = await getJobs(
    `recruiterId=${session?.user.id}`
  )

  return (
    <div className="min-h-screen w-full bg-[#08080c] px-3 py-6 text-neutral-100 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ১. টপ হেডার ও ব্রেডক্রাম্ব */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* ব্রেডক্রাম্ব */}
            <div className="mb-2 flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="text-neutral-400">Manage Jobs</span>
              <ChevronRight className="h-3 w-3 text-neutral-600" />
              <span className="text-[#8a75ff]">
                Job Listings &amp; Postings
              </span>
            </div>

            {/* মেইন টাইটেল ও সাবটাইটেল */}
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Manage Job Posts
            </h1>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          {/* + New Job Post বাটন */}
          <Link
            href="/dashboard/recruiter/post-job"
            className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] px-4.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(88,81,255,0.45)] transition-all duration-200 hover:bg-[#4942f2] hover:shadow-[0_0_25px_rgba(88,81,255,0.65)] active:scale-95 sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Job Post</span>
          </Link>
        </div>

        {/* ======================================================== */}
        {/* ২. রেসপনসিভ ডার্ক গ্লাস টেবিল কনটেইনার */}
        {/* স্ক্রিন ফিট ও অতিরিক্ত স্ক্রলবার এড়াতে প্যাডিং অপ্টিমাইজড */}
        {/* ======================================================== */}
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/90 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              {/* টেবিল হেডার */}
              <thead>
                <tr className="border-b border-white/10 bg-[#12121c]/70 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                  <th scope="col" className="px-3.5 py-3.5 sm:px-4">
                    Job Title &amp; Dept
                  </th>
                  <th scope="col" className="px-3 py-3.5 sm:px-3.5">
                    Company &amp; Location
                  </th>
                  <th scope="col" className="px-2.5 py-3.5 sm:px-3">
                    Type
                  </th>
                  <th scope="col" className="px-2.5 py-3.5 sm:px-3">
                    Compensation
                  </th>
                  <th scope="col" className="px-2.5 py-3.5 sm:px-3">
                    Applicants
                  </th>
                  <th scope="col" className="px-2.5 py-3.5 sm:px-3">
                    Status
                  </th>
                  <th scope="col" className="px-2.5 py-3.5 sm:px-3">
                    Deadline
                  </th>
                  <th scope="col" className="px-3.5 py-3.5 text-right sm:px-4">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* টেবিল বডি */}
              <tbody className="divide-y divide-white/5">
                {jobs.map((job) => {
                  const deptConfig = getDeptConfig(job.department)
                  const DeptIcon = deptConfig.icon
                  const isActive = job.status === "active"

                  return (
                    <tr
                      key={job._id}
                      className="group transition-colors duration-150 hover:bg-[#151522]/60"
                    >
                      {/* ১. JOB TITLE & DEPT */}
                      <td className="px-3.5 py-3.5 sm:px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${deptConfig.badgeColor}`}
                          >
                            <DeptIcon className="h-4 w-4" />
                          </div>
                          <div className="max-w-45 min-w-0 sm:max-w-none">
                            <Link
                              href={`/dashboard/recruiter/jobs/${job._id}`}
                              className="block truncate font-semibold text-white transition-colors group-hover:text-[#a594ff] hover:text-[#a594ff]"
                              title={job.title}
                            >
                              {job.title}
                            </Link>
                            <div
                              className={`mt-0.5 truncate text-[11px] font-medium ${deptConfig.labelColor}`}
                            >
                              {job.department || job.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ২. COMPANY & LOCATION */}
                      <td className="px-3 py-3.5 whitespace-nowrap sm:px-3.5">
                        <div>
                          <div className="font-medium text-neutral-200">
                            {job.companyName}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-400">
                            {job.isRemote ? (
                              <Globe2 className="h-3 w-3 text-neutral-500" />
                            ) : (
                              <MapPin className="h-3 w-3 text-neutral-500" />
                            )}
                            <span
                              className="max-w-32.5 truncate"
                              title={job.location}
                            >
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ৩. TYPE */}
                      <td className="px-2.5 py-3.5 whitespace-nowrap sm:px-3">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-[#161622] px-2.5 py-0.5 text-[11px] font-medium text-neutral-300">
                          {job.jobType}
                        </span>
                      </td>

                      {/* ৪. COMPENSATION */}
                      <td className="px-2.5 py-3.5 whitespace-nowrap sm:px-3">
                        <span className="text-xs font-medium text-neutral-200">
                          {job.compensation}
                        </span>
                      </td>

                      {/* ৫. APPLICANTS */}
                      <td className="px-2.5 py-3.5 whitespace-nowrap sm:px-3">
                        <Link
                          href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                          title="View Candidates"
                        >
                          <Users className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{job.applicantsCount || 0} Candidates</span>
                        </Link>
                      </td>

                      {/* ৬. STATUS */}
                      <td className="px-2.5 py-3.5 whitespace-nowrap sm:px-3">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/80 px-2 py-0.5 text-[11px] font-medium text-neutral-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                            Expired
                          </span>
                        )}
                      </td>

                      {/* ৭. DEADLINE */}
                      <td className="px-2.5 py-3.5 whitespace-nowrap sm:px-3">
                        <div>
                          <div className="text-xs font-medium text-neutral-200">
                            {job.deadlineFormatted}
                          </div>
                          <div className="mt-0.5 text-[10px] text-neutral-500">
                            {job.postedTime}
                          </div>
                        </div>
                      </td>

                      {/* ৮. ACTIONS */}
                      <td className="px-3.5 py-3.5 text-right whitespace-nowrap sm:px-4">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* ১. View Details বাটন */}
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}`}
                            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-[#171724] px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-blue-500/40 hover:bg-[#1e1e32] hover:text-white"
                            title="View Job Details"
                          >
                            <Eye className="h-3.5 w-3.5 text-blue-400" />
                            <span>Details</span>
                          </Link>

                          {/* ২. Update বাটন */}
                          <Link
                            href={`/dashboard/recruiter/post-job?edit=${job._id}`}
                            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-[#171724] px-2.5 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:border-[#5851ff]/40 hover:bg-[#202034] hover:text-white"
                            title="Edit Job Post"
                          >
                            <Pencil className="h-3 w-3 text-[#8a75ff]" />
                            <span>Update</span>
                          </Link>

                          {/* ৩. Delete বাটন */}
                          <DeleteButton job={job} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* এম্পটি স্টেট (যদি কোনো জব না থাকে) */}
          {jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                No job postings found
              </h3>
              <p className="mt-1 text-xs text-neutral-400">
                You haven&apos;t created any job listings yet.
              </p>
              <Link
                href="/dashboard/recruiter/post-job"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5851ff] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#4942f2]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Post Your First Job</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
