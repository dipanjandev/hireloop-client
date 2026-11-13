export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const
export type JobType = (typeof JOB_TYPES)[number]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product Management",
  "Marketing & Sales",
  "DevOps & Cloud",
  "AI & Data Science",
  "Finance & Operations",
  "Customer Support",
] as const
export type JobCategory = (typeof JOB_CATEGORIES)[number] | string

export const SALARY_FREQUENCIES = ["per hour", "per month", "per year"] as const
export type SalaryFrequency = (typeof SALARY_FREQUENCIES)[number]

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
  deadlineFormatted?: string
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
  postedTime?: string
  createdAt: string
  updatedAt: string
}

// ড্যাশবোর্ড টেবিলে প্রদর্শনের জন্য জব আইটেম টাইপ (Job থেকে ডিরাইভড)
export type DisplayJobItem = Partial<Job> &
  Required<
    Pick<
      Job,
      | "_id"
      | "title"
      | "department"
      | "companyName"
      | "location"
      | "isRemote"
      | "jobType"
      | "compensation"
      | "applicantsCount"
      | "status"
      | "deadlineFormatted"
      | "postedTime"
    >
  >

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
