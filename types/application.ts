// Job Application Types & Models for HireLoop

// ১. অ্যাপ্লিকেশনের বিভিন্ন স্ট্যাটাস
export type ApplicationStatus =
  | "applied"
  | "reviewing"
  | "interview"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "withdrawn"
  | "draft"

// ২. আবেদন সাবমিট করার ইনপুট পেলোড (CreateApplicationInput)
export interface CreateApplicationInput {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  applicantName?: string
  applicantPhone?: string
  resumeUrl?: string
  coverLetter?: string
  location?: string
  salary?: string
  jobType?: string
  appliedAt?: string
  status?: ApplicationStatus
  notes?: string
}

// ৩. ডাটাবেজে সংরক্ষিত পূর্ণাঙ্গ অ্যাপ্লিকেশন মডেল (JobApplication)
export interface JobApplication extends CreateApplicationInput {
  _id: string
  status: ApplicationStatus
  appliedAt: string
  createdAt: string
  updatedAt: string
  closingDate?: string
  closesInDays?: number
}

// ৪. সিকার ড্যাশবোর্ড বা My Applications পেজের কার্ডে রেন্ডার করার টাইপ (DisplayApplicationItem)
export interface DisplayApplicationItem {
  _id: string
  jobId: string
  jobTitle: string
  companyName: string
  companyTag?: string // যেমন: "TECHFLOW", "VERCEL", "LINEAR", "META"
  location: string
  salary: string
  jobType?: string
  status: ApplicationStatus
  appliedAt: string
  appliedTimeFormatted: string
  closesInText?: string // যেমন: "Closes in 3 days"
  isClosed?: boolean
  isSaved?: boolean
  notes?: string
}
