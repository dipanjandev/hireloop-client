import React from "react"
import Link from "next/link"
import { ShieldAlert, Home, Lock } from "lucide-react"

const UnauthorizedPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#08080c] px-4 py-12 text-neutral-100 sm:px-6">
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো ইফেক্ট */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5851ff]/10 blur-[100px]" />

      {/* মেইন গ্লাসমরফিজম কার্ড */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#0d0d14]/90 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-10">
        {/* টপ সিকিউরিটি ব্যাজ */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-rose-400 uppercase">
          <Lock className="h-3 w-3" />
          <span>Error 403 • Access Denied</span>
        </div>

        {/* সেন্টার অ্যানিমেটেড/গ্লোয়িং আইকন বক্স */}
        <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-rose-500/25 bg-linear-to-br from-rose-500/15 to-[#161622] text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
          <ShieldAlert className="h-10 w-10" />
        </div>

        {/* শিরোনাম ও বর্ণনা */}
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Unauthorized Access
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          Sorry, you don&apos;t have the required permissions to view this page.
        </p>

        {/* ডিভাইডার */}
        <div className="my-7 border-t border-white/5" />

        {/* অ্যাকশন বাটনসমূহ */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5851ff] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#5851ff]/25 transition-all hover:bg-[#4942f2] active:scale-95"
          >
            <Home className="h-4 w-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
