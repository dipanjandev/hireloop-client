import { CreateJobInput, DisplayJobItem, Job } from "@/types/job"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ১. সকল জব তালিকা আনার জন্য (GET /jobs)
export const getJobs = async (query = ""): Promise<DisplayJobItem[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

// ২. নতুন জব পোস্ট করার জন্য (POST /jobs)
export const createJob = async (data: CreateJobInput) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ৩. জব ডিলিট করার জন্য (DELETE /jobs/:id)
export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  })
  return res.json()
}

// ৪. নির্দিষ্ট একটি জব বিস্তারিত আনার জন্য (GET /jobs/:id)
export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${id}`, { cache: "no-store" })
    if (res.ok) {
      return res.json()
    }
  } catch {}

  // Fallback: যদি ব্যাকএন্ড সরাসরি /jobs/:id রিটার্ন না করে, তবে /jobs থেকে ফিল্টার করবে
  try {
    const allRes = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" })
    if (allRes.ok) {
      const allJobs: Job[] = await allRes.json()
      return allJobs.find((j) => j._id === id) || null
    }
  } catch {}

  return null
}
