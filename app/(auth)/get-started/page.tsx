"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  UserCheck,
} from "lucide-react"
import { signUp } from "@/lib/auth-client"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

export default function SignUpPage() {
  // ১. সাইন-আপ ফর্ম ডাটা স্টেট (Sign Up Form Data State)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "seeker", // "seeker" (চাকরিপ্রার্থী) অথবা "employer" (কোম্পানি/নিয়োগকারী)
    agreeTerms: false,
  })

  // ২. পাসওয়ার্ড শো/হাইড ও লোডিং স্টেট
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ৩. ইনপুট পরিবর্তন হ্যান্ডলার (Input Change Handler)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // ৪. অ্যাকাউন্ট টাইপ নির্বাচন হ্যান্ডলার (Seeker vs Employer)
  const handleTypeSelect = (type: "seeker" | "employer") => {
    setFormData((prev) => ({ ...prev, accountType: type }))
  }

  // ৫. ফর্ম সাবমিট হ্যান্ডলার (Submit Event Handler)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // ফর্ম থেকে সংগৃহীত ডাটা কনসোলে লগ করা হচ্ছে
    // console.log("Sign Up Form Submitted Data:", formData)

    /*
      TODO: আপনার সুবিধার্থে এখানে Better-Auth বা ব্যাকএন্ড এপিআই কল করার জায়গা রাখা হলো।
      যেমন:
      await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    */
    const { data, error } = await signUp.email({
      ...formData,
    })
    if (data) {
      toast.success("Account Create Successfully!")
      redirect("/")
    } else if (error) {
      toast.error("Something Went Wrong!")
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // ৬. গুগল দিয়ে সাইন-আপ হ্যান্ডলার
  const handleGoogleSignUp = () => {
    // console.log("Triggered Google Sign Up")
    /*
      TODO: Better-Auth Google Sign Up Integration
      await signIn.social({ provider: "google" })
    */
  }

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 py-12">
      {/* ব্যাকগ্রাউন্ড অরা নিওন গ্লো (Atmospheric Ambient Glow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5851ff]/15 blur-[150px]"
      />

      {/* মূল সাইন-আপ কার্ড কনটেইনার */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#121217]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10">
        {/* ব্র্যান্ড হেডার ও টাইটেল */}
        <div className="mb-7 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 inline-block">
            <Image
              src="/images/logo.png"
              alt="hireloop"
              width={130}
              height={34}
              className="object-contain"
              priority
            />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Get Started with HireLoop
          </h1>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Create an account to unlock curated jobs and world-class talent.
          </p>
        </div>

        {/* অ্যাকাউন্ট টাইপ নির্বাচন (Job Seeker নাকি Employer) */}
        <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#161620] p-1.5">
          <button
            type="button"
            onClick={() => handleTypeSelect("seeker")}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
              formData.accountType === "seeker"
                ? "bg-[#5851ff] text-white shadow-[0_0_15px_rgba(88,81,255,0.4)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Job Seeker
          </button>

          <button
            type="button"
            onClick={() => handleTypeSelect("employer")}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
              formData.accountType === "employer"
                ? "bg-[#5851ff] text-white shadow-[0_0_15px_rgba(88,81,255,0.4)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Employer
          </button>
        </div>

        {/* গুগল ওয়ান-ক্লিক সাইন-আপ বাটন */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#191922] text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-white/20 hover:bg-[#20202c] hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* ওরিজিনাল ডিভাইডার */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-[#121217] px-3 text-xs text-neutral-500 uppercase">
            Or continue with email
          </span>
        </div>

        {/* সাইন-আপ ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ইনপুট ১: পুরো নাম */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-medium text-neutral-300"
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-4 w-4 text-neutral-500" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#16161f] pr-4 pl-10 text-sm text-neutral-100 placeholder-neutral-500 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
              />
            </div>
          </div>

          {/* ইনপুট ২: ইমেইল এড্রেস */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-300"
            >
              Work or Personal Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-neutral-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#16161f] pr-4 pl-10 text-sm text-neutral-100 placeholder-neutral-500 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
              />
            </div>
          </div>

          {/* ইনপুট ৩: পাসওয়ার্ড */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-neutral-300"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-neutral-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#16161f] pr-10 pl-10 text-sm text-neutral-100 placeholder-neutral-500 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-neutral-500 transition-colors hover:text-neutral-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* শর্তাবলী সম্মতি চেকবক্স (Terms of Service Checkbox) */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="agreeTerms"
              type="checkbox"
              name="agreeTerms"
              required
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-white/10 bg-[#16161f] text-[#5851ff] accent-[#5851ff] focus:ring-0"
            />
            <label
              htmlFor="agreeTerms"
              className="cursor-pointer text-xs leading-normal text-neutral-400"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-[#8a75ff] hover:text-[#a594ff] hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#8a75ff] hover:text-[#a594ff] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* সাইন আপ সাবমিট বাটন */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] text-sm font-semibold text-white shadow-[0_0_20px_rgba(88,81,255,0.4)] transition-all duration-200 hover:bg-[#4942f2] hover:shadow-[0_0_25px_rgba(88,81,255,0.6)] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* পেজ টগল লিংক (Sign In পেজে যাওয়ার জন্য) */}
        <p className="mt-7 text-center text-xs text-neutral-400 sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#8a75ff] transition-colors hover:text-[#a594ff] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
