"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Camera,
  Briefcase,
  Building2,
  Upload,
} from "lucide-react"
import { signUp } from "@/lib/auth-client"
import toast from "react-hot-toast"

export default function SignUpPage() {
  const router = useRouter()

  // ১. সাইন-আপ ফর্ম ডাটা স্টেট (ডিফল্ট রোল seeker, অপশন: seeker | recruiter)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker" as "seeker" | "recruiter",
    agreeTerms: false,
    image: "",
  })

  console.log("Image Url Test", formData)

  // ২. প্রোফাইল ছবি স্টেট ও প্রিভিউ
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // ৩. পাসওয়ার্ড শো/হাইড ও লোডিং স্টেট
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ৪. ইনপুট পরিবর্তন হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // ৫. রোল পরিবর্তন হ্যান্ডলার (seeker অথবা recruiter)
  const handleRoleSelect = (selectedRole: "seeker" | "recruiter") => {
    setFormData((prev) => ({ ...prev, role: selectedRole }))
  }

  // ৬. ছবি আপলোড ফিল্ড হ্যান্ডলার (ইউজার পরবর্তীতে নিজস্ব ব্যাকএন্ড/ক্লাউড আপলোড লজিক যুক্ত করবেন)
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // প্রিভিউ তৈরি
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    const uploadData = new FormData()
    uploadData.append("image", file)

    const imageBBAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`

    const res = await fetch(imageBBAPI, {
      method: "POST",
      body: uploadData,
    })
    const result = await res.json()
    const imageUrl = result.data.url
    // console.log(result)
    setFormData((prev) => ({ ...prev, image: imageUrl }))
  }

  // ৭. ফর্ম সাবমিট হ্যান্ডলার ও Better-Auth-এ ডাটা প্রেরণ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast.error("Please agree to the Terms of Service & Privacy Policy")
      return
    }

    setIsLoading(true)

    try {
      // Better-Auth এর signUp.email মেথডে ডাটা সেন্ড করা হচ্ছে
      const { data, error } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // role: formData.role,
        image: formData.image,
      } as Record<string, unknown> as Parameters<typeof signUp.email>[0])

      if (error) {
        toast.error(
          error.message || "Failed to create account. Please try again."
        )
        setIsLoading(false)
        return
      }

      if (data) {
        toast.success("Account created successfully!")
        router.push("/")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("An unexpected error occurred!")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // ৬. গুগল দিয়ে সাইন-আপ হ্যান্ডলার
  const handleGoogleSignUp = async () => {
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

        {/* ডিভাইডার */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-[#121217] px-3 text-xs text-neutral-500 uppercase">
            Or continue with email
          </span>
        </div>

        {/* সাইন-আপ ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ১. রোল সিলেকশন (Job Seeker / Recruiter - seeker ডিফল্ট) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">
              I want to join as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect("seeker")}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all duration-200 ${
                  formData.role === "seeker"
                    ? "border-[#5851ff] bg-[#5851ff]/15 text-white shadow-[0_0_15px_rgba(88,81,255,0.25)] ring-1 ring-[#5851ff]"
                    : "border-white/10 bg-[#16161f] text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                }`}
              >
                <Briefcase className="h-4 w-4 text-[#8a75ff]" />
                <span>Job Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("recruiter")}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all duration-200 ${
                  formData.role === "recruiter"
                    ? "border-[#5851ff] bg-[#5851ff]/15 text-white shadow-[0_0_15px_rgba(88,81,255,0.25)] ring-1 ring-[#5851ff]"
                    : "border-white/10 bg-[#16161f] text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                }`}
              >
                <Building2 className="h-4 w-4 text-[#8a75ff]" />
                <span>Recruiter</span>
              </button>
            </div>
          </div>

          {/* ২. প্রোফাইল ছবি আপলোড ফিল্ড (প্রিভিউ + অন-চেঞ্জ হ্যান্ডলার) */}
          <div className="flex flex-col items-center justify-center gap-2 py-1">
            <div className="group relative">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/20 bg-[#16161f] transition-colors group-hover:border-[#5851ff]">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <Camera className="h-7 w-7 text-neutral-500 transition-colors group-hover:text-neutral-300" />
                )}
              </div>
              <label
                htmlFor="profile-image-upload"
                className="absolute right-0 bottom-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#5851ff] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                title="Upload Photo"
              >
                <Upload className="h-3.5 w-3.5" />
                <span className="sr-only">Upload Profile Photo</span>
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-200"
            >
              {imagePreview
                ? "Change profile photo"
                : "Upload profile photo (optional)"}
            </label>
          </div>

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

          {/* শর্তাবলী সম্মতি চেকবক্স */}
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

        {/* পেজ টগল লিংক */}
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
