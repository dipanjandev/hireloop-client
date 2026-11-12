import { CreateJobInput, DisplayJobItem } from "@/types/job"

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
