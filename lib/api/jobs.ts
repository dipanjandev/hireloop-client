"use server"
import { CreateApplicationInput } from "@/types/application"
import { CreateJobInput, DisplayJobItem, Job } from "@/types/job"
import { authFetch, protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// ১. সকল জব তালিকা আনার জন্য (GET /jobs)
export const getJobs = async (query = ""): Promise<DisplayJobItem[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`, {
    cache: "no-cache",
  })
  return res.json()
}

// ২. নতুন জব পোস্ট করার জন্য (POST /jobs)
export const createJob = async (data: CreateJobInput) => {
  const api = `${BASE_URL}/jobs`
  const res = await protectedMutation(api, "POST", data)
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
  const res = await fetch(`${BASE_URL}/jobs/${id}`, { cache: "no-store" })
  return res.json()
}

// ৫. এপ্লিকেশন এর ডাটা কালেক্ট করবে যে এপিআই।
export const applyToAJob = async (data: CreateApplicationInput) => {
  const api = `${BASE_URL}/applications`

  const response = await protectedMutation(api, "POST", data)
  return response.json()
}

// Get Application
export const getApplications = async (query: string) => {
  const api = `${BASE_URL}/applications?${query}`
  const res = await authFetch(api)
  return res.json()
}

export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`, {
    cache: "no-store",
  })
  return res.json()
}
