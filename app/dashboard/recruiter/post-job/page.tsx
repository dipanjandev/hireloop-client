"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Globe2,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react"
import toast from "react-hot-toast"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const jobCategories = [
  "Engineering & Tech",
  "Design & Creative",
  "Product Management",
  "Marketing & Sales",
  "DevOps & Cloud",
  "AI & Data Science",
  "Finance & Operations",
  "Customer Support",
]

const salaryFrequencies = ["per hour", "per month", "per year"]

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    category: "Engineering & Tech", // ড্রপডাউনের জন্য প্রথম অপশনটি রাখা ভালো
    jobType: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "per month",
    currency: "€",
    responsibilities: "",
    qualifications: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRemoteToggle = () => {
    setFormData((prev) => ({ ...prev, isRemote: !prev.isRemote }))
  }

  const handleJobTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, jobType: type }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("Submitting New Job Listing:", formData)

    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Job published successfully!")
    }, 800)
  }

  return (
    <div className="min-h-screen w-full bg-[#08080c] px-4 py-8 text-neutral-100 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* ১. টপ হেডার ও ব্রেডক্রাম্ব */}
        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              {/* ব্রেডক্রাম্ব */}
              <div className="mb-2 flex items-center gap-1.5 text-xs text-neutral-400">
                <Link
                  href="/dashboard/recruiter/jobs"
                  className="transition-colors hover:text-white"
                >
                  Manage Jobs
                </Link>
                <ChevronRight className="h-3 w-3 text-neutral-600" />
                <span className="text-[#8a75ff]">Create New Listing</span>
              </div>

              {/* মূল টাইটেল */}
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Post a New Job
              </h1>
              <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                Fill in the position specifications to attract qualified talent
                across our network.
              </p>
            </div>

            {/* পাবলিশ অ্যাকশন বাটন */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] px-6 text-sm font-semibold text-white shadow-[0_0_20px_rgba(88,81,255,0.45)] transition-all duration-200 hover:bg-[#4942f2] hover:shadow-[0_0_25px_rgba(88,81,255,0.65)] active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Publish Job</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <div className="space-y-10">
            {/* ======================================================== */}
            {/* সেকশন ১: Basic Information                               */}
            {/* ======================================================== */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#5851ff] shadow-[0_0_8px_#5851ff]" />
                <span>1. Basic Information</span>
              </div>

              {/* জব টাইটেল ইনপুট */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-xs font-medium text-neutral-300"
                >
                  Job Title <span className="text-[#8a75ff]">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#121217] px-4 text-sm text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                />
              </div>

              {/* কোম্পানি নেম ও জব ক্যাটাগরি (২ কলাম) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* কোম্পানি নেম */}
                <div className="space-y-2">
                  <label
                    htmlFor="companyName"
                    className="text-xs font-medium text-neutral-300"
                  >
                    Company Name <span className="text-[#8a75ff]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Building2 className="absolute left-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#121217] pr-4 pl-10 text-sm text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* জব ক্যাটাগরি */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-xs font-medium text-neutral-300"
                  >
                    Job Category <span className="text-[#8a75ff]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#121217] px-4 text-sm text-neutral-100 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    >
                      {jobCategories.map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          className="bg-[#121217] text-white"
                        >
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 h-4 w-4 text-neutral-400" />
                  </div>
                </div>
              </div>

              {/* জব টাইপ টগল বাটনসমূহ */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300">
                  Job Type <span className="text-[#8a75ff]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#0f0f14] p-1.5 sm:grid-cols-4">
                  {jobTypes.map((type) => {
                    const isSelected = formData.jobType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleJobTypeSelect(type)}
                        className={`flex h-11 cursor-pointer items-center justify-center rounded-xl text-xs font-semibold transition-all duration-200 sm:text-sm ${
                          isSelected
                            ? "border border-[#5851ff] bg-[#1a1a28] text-white shadow-[0_0_15px_rgba(88,81,255,0.3)]"
                            : "border border-transparent text-neutral-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* সেকশন ২: Location, Compensation & Timeline                */}
            {/* ======================================================== */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#5851ff] shadow-[0_0_8px_#5851ff]" />
                <span>2. Location, Compensation & Timeline</span>
              </div>

              {/* রিমোট ওয়ার্ক এলাউড সুইচ বক্স */}
              <div
                onClick={handleRemoteToggle}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-[#121217] p-4 transition-all hover:border-white/20 sm:p-5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#8a75ff]">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Remote Work Allowed (isRemote)
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Enable worldwide or distributed candidate applications
                    </p>
                  </div>
                </div>

                {/* টগল সুইচ */}
                <div
                  className={`relative flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
                    formData.isRemote ? "bg-[#5851ff]" : "bg-neutral-800"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      formData.isRemote ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* জব লোকেশন ও ডেডলাইন (২ কলাম) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* জব লোকেশন */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="location"
                      className="text-xs font-medium text-neutral-300"
                    >
                      Job Location (location)
                    </label>
                    <span className="text-[11px] font-medium text-neutral-500">
                      Required
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, USA or Remote"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#121217] pr-4 pl-10 text-sm text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* ডেডলাইন */}
                <div className="space-y-2">
                  <label
                    htmlFor="deadline"
                    className="text-xs font-medium text-neutral-300"
                  >
                    Application Deadline (deadline)
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#121217] pr-4 pl-10 text-sm text-neutral-100 scheme-dark transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* স্যালারি রেঞ্জ ও ফ্রিকোয়েন্সি (৩ কলাম) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Min Salary */}
                <div className="space-y-2">
                  <label
                    htmlFor="minSalary"
                    className="text-xs font-medium text-neutral-300"
                  >
                    Min Salary / Rate
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-medium text-neutral-400">
                      {formData.currency}
                    </span>
                    <input
                      id="minSalary"
                      name="minSalary"
                      type="number"
                      value={formData.minSalary}
                      onChange={handleChange}
                      placeholder="25"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#121217] pr-4 pl-9 text-sm text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Max Salary */}
                <div className="space-y-2">
                  <label
                    htmlFor="maxSalary"
                    className="text-xs font-medium text-neutral-300"
                  >
                    Max Salary / Rate
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-medium text-neutral-400">
                      {formData.currency}
                    </span>
                    <input
                      id="maxSalary"
                      name="maxSalary"
                      type="number"
                      value={formData.maxSalary}
                      onChange={handleChange}
                      placeholder="40"
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#121217] pr-4 pl-9 text-sm text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <label
                    htmlFor="frequency"
                    className="text-xs font-medium text-neutral-300"
                  >
                    Frequency
                  </label>
                  <div className="relative flex items-center">
                    <select
                      id="frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#121217] px-4 text-sm text-neutral-100 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                    >
                      {salaryFrequencies.map((freq) => (
                        <option
                          key={freq}
                          value={freq}
                          className="bg-[#121217] text-white"
                        >
                          {freq}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 h-4 w-4 text-neutral-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* সেকশন ৩: Responsibilities & Requirements                 */}
            {/* ======================================================== */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#5851ff] shadow-[0_0_8px_#5851ff]" />
                <span>3. Responsibilities & Requirements</span>
              </div>

              {/* মূল দায়িত্বসমূহ (Key Responsibilities) */}
              <div className="space-y-2">
                <label
                  htmlFor="responsibilities"
                  className="text-xs font-medium text-neutral-300"
                >
                  Key Responsibilities <span className="text-[#8a75ff]">*</span>
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={4}
                  required
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Describe the primary responsibilities and daily tasks for this role..."
                  className="w-full rounded-2xl border border-white/10 bg-[#121217] p-4 text-sm leading-relaxed text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                />
              </div>

              {/* যোগ্যতা ও শর্তাবলী (Qualifications & Requirements) */}
              <div className="space-y-2">
                <label
                  htmlFor="qualifications"
                  className="text-xs font-medium text-neutral-300"
                >
                  Qualifications & Requirements{" "}
                  <span className="text-[#8a75ff]">*</span>
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  rows={5}
                  required
                  value={formData.qualifications}
                  onChange={handleChange}
                  placeholder="• Years of experience&#10;• Required technical stack&#10;• Soft skills and domain knowledge"
                  className="w-full rounded-2xl border border-white/10 bg-[#121217] p-4 text-sm leading-relaxed text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
