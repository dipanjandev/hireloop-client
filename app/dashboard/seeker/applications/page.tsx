import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ChevronDown } from "lucide-react"
import ApplicationHeader from "@/components/seeker-applications/ApplicationHeader"
import ApplicationStats from "@/components/seeker-applications/ApplicationStats"
import ApplicationFilterTabs from "@/components/seeker-applications/ApplicationFilterTabs"
import ApplicationCard from "@/components/seeker-applications/ApplicationCard"
import { getApplications } from "@/lib/api/jobs"
import { DisplayApplicationItem } from "@/types/application"

export default async function SeekerApplicationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const applications: DisplayApplicationItem[] = await getApplications(
    `applicantId=${session?.user.id}`
  )

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
            totalCount={applications.length}
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
            <ApplicationCard key={item._id} application={item} />
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
