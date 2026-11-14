"use client"

import { applyToAJob, getApplicationsCount } from "@/lib/api/jobs"
import { useSession } from "@/lib/auth-client"
import { CreateApplicationInput } from "@/types/application"
import { Job } from "@/types/job"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const ApplyButton = ({ job }: { job: Job }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  //   console.log(user?.role)

  const handleClickApply = async () => {
    if (!user) {
      router.push(`/signin?redirectTo=/browse-jobs/${job._id}`)
    } else if (user?.role === "seeker") {
      // কতগুলো এপ্লাই করল সেটা দেখাতে হবে এখানে।
      const countResult = await getApplicationsCount(`applicantId=${user.id}`)
      // এখন আমরা কন্ডিশন এপ্লাই করব।
      if (countResult.count >= 10) {
        // আমরা তাকে পেমেন্ট পেজ এর মধ্যে রিডাইরেক্ট করে দিব।
        router.push("/payment")
        return
      } else {
        //   TODO: only send jobId and userId or email address for the application
        const application: CreateApplicationInput = {
          jobId: job._id,
          userId: user.id,
          email: user.email,
          jobTitle: job.title,
          companyName: job.companyName,
        }
        const result = await applyToAJob(application)
        //   console.log(result)

        if (result.insertedId) {
          // console.log("Application Submitted Successfully")
          toast.success("Application Submitted Successfully")
        }
      }
    } else {
      console.log("User is not a Job seeker")
    }
  }

  return (
    <button
      type="button"
      onClick={handleClickApply}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-neutral-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-neutral-200 active:scale-95 sm:px-8"
    >
      <span>Apply Now</span>
    </button>
  )
}

export default ApplyButton
