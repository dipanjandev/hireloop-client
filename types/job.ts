export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type JobCategory =
  | "Engineering & Tech"
  | "Design & Creative"
  | "Product Management"
  | "Marketing & Sales"
  | "DevOps & Cloud"
  | "AI & Data Science"
  | "Finance & Operations"
  | "Customer Support"
  | string

export type SalaryFrequency = "per hour" | "per month" | "per year"

export type JobStatus = "active" | "draft" | "closed" | "expired"

// ১. জব পোস্ট করার জন্য প্রয়োজনীয় ইনপুট টাইপ (CreateJobInput)
export interface CreateJobInput {
  title: string
  companyName: string
  category: JobCategory
  department?: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary?: number | string
  maxSalary?: number | string
  frequency: SalaryFrequency
  currency?: string
  compensation?: string
  responsibilities: string
  qualifications: string
  recruiterId?: string
  recruiterEmail?: string
  applicantsCount?: number
  status?: JobStatus
}

// ২. ডাটাবেজ থেকে রিটার্ন হওয়া সম্পূর্ণ জব মডেল (Job)
export interface Job extends CreateJobInput {
  _id: string
  status: JobStatus
  applicantsCount?: number
  createdAt: string
  updatedAt: string
}

// ৩. এপিআই রেসপন্স র‍্যাপার টাইপ
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// ৪. ফিল্টারিং প্যারামিটার টাইপ
export interface JobFilters {
  q?: string
  category?: string
  jobType?: string
  isRemote?: boolean
  location?: string
  minSalary?: number
  maxSalary?: number
}
