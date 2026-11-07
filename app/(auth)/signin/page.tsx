"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"

export default function SignInPage() {
  // ১. ফর্ম ডাটা স্টেট (Form Data State)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // ২. পাসওয়ার্ড শো/হাইড স্টেট
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ৩. ইনপুট পরিবর্তন হ্যান্ডলার (Dynamic Change Handler)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // ৪. ফর্ম সাবমিট হ্যান্ডলার (Submit Event Handler)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // ফর্ম থেকে সংগৃহীত ডাটা কনসোলে দেখানো হচ্ছে
    console.log("Sign In Form Submitted Data:", formData)

    /*
      TODO: আপনার সুবিধার্থে এখানে Better-Auth বা ব্যাকএন্ড এপিআই কল করার জায়গা রাখা হলো।
      যেমন:
      await signIn.email({
        email: formData.email,
        password: formData.password,
      })
    */

    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // ৫. গুগল সাইন-ইন হ্যান্ডলার (Google Auth Handler)
  const handleGoogleSignIn = () => {
    console.log("Triggered Google Sign In")
    /*
      TODO: Better-Auth Google Sign In Integration
      await signIn.social({ provider: "google" })
    */
  }

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 py-12">
      {/* ব্যাকগ্রাউন্ড নিওন অরা গ্লো (Atmospheric Glow) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5851ff]/15 blur-[140px]"
      />

      {/* মূল সাইন-ইন কার্ড কনটেইনার */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#121217]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10">
        {/* ব্র্যান্ড হেডার ও ওয়েলকাম টেক্সট */}
        <div className="mb-8 flex flex-col items-center text-center">
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
            Welcome Back
          </h1>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Sign in to access your jobs, applications, and saved roles.
          </p>
        </div>

        {/* গুগল ওয়ান-ক্লিক বাটন */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
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
          Continue with Google
        </button>

        {/* ওরিজিনাল ডিভাইডার */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-[#121217] px-3 text-xs text-neutral-500 uppercase">
            Or sign in with email
          </span>
        </div>

        {/* ফর্ম শুরু */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ইনপুট ১: ইমেইল এড্রেস */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-300"
            >
              Email Address
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
                placeholder="name@company.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#16161f] pr-4 pl-10 text-sm text-neutral-100 placeholder-neutral-500 transition-colors focus:border-[#5851ff] focus:ring-1 focus:ring-[#5851ff] focus:outline-none"
              />
            </div>
          </div>

          {/* ইনপুট ২: পাসওয়ার্ড */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-medium text-neutral-300"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#8a75ff] transition-colors hover:text-[#a594ff] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-neutral-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
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

          {/* রিমেম্বার মি চেকবক্স */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-white/10 bg-[#16161f] text-[#5851ff] accent-[#5851ff] focus:ring-0"
              />
              <span className="text-xs text-neutral-400">Remember me</span>
            </label>
          </div>

          {/* সাইন ইন সাবমিট বাটন */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] text-sm font-semibold text-white shadow-[0_0_20px_rgba(88,81,255,0.4)] transition-all duration-200 hover:bg-[#4942f2] hover:shadow-[0_0_25px_rgba(88,81,255,0.6)] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* পেজ টগল লিংক (Sign Up / Get Started পেজে যাওয়ার জন্য) */}
        <p className="mt-7 text-center text-xs text-neutral-400 sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/get-started"
            className="font-semibold text-[#8a75ff] transition-colors hover:text-[#a594ff] hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}
