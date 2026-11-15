import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  LayoutDashboard,
  ShieldCheck,
  Receipt,
  Mail,
  Zap,
} from "lucide-react"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  const { status, customer_email, metadata, payment_intent, payment_status } =
    session

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    console.log({ customer_email, metadata, payment_intent, payment_status })
    // এখান থেকে চেক করতে হবে যে ডাটা ঠিকভাবে ডাটাবেজ এর মধ্যে যাচ্ছে কি না।
    const result = await checkoutVerify(session_id)
    console.log(result)

    const transactionId =
      typeof payment_intent === "object" && payment_intent !== null
        ? payment_intent.id
        : typeof payment_intent === "string"
          ? payment_intent
          : session_id

    const formattedAmount =
      session.amount_total !== null && session.amount_total !== undefined
        ? `${(session.amount_total / 100).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${(session.currency || "USD").toUpperCase()}`
        : "Paid"

    return (
      <div className="flex min-h-screen w-full flex-col justify-between bg-[#08080c] px-4 py-10 text-neutral-100 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          {/* ======================================================== */}
          {/* কার্ড কন্টেইনার (মডার্ন ডার্ক গ্লাস লূক) */}
          {/* ======================================================== */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d14]/90 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
            {/* ব্যাকগ্রাউন্ড অরা গ্লো ইফেক্ট */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="pointer-events-none absolute right-0 -bottom-20 h-64 w-64 rounded-full bg-[#5851ff]/15 blur-3xl" />

            {/* হেডার ও সাকসেস আইকন */}
            <div className="relative flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="h-10 w-10 animate-in duration-300 zoom-in-75" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[#08080c]">
                  <Sparkles className="h-3.5 w-3.5 fill-current" />
                </span>
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Payment Confirmed &amp; Verified</span>
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Payment Successful!
              </h1>
              <p className="mt-2 text-sm text-neutral-300 sm:text-base">
                Welcome to{" "}
                <span className="font-semibold text-white">HireLoop Pro</span>.
                Your membership is now active and unlimited applications are
                unlocked.
              </p>
            </div>

            {/* কনফার্মেশন ও রিসিপ্ট ইনফো */}
            {customer_email && (
              <div className="relative mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-[#121217]/60 px-4 py-2.5 text-xs text-neutral-400">
                <Mail className="h-4 w-4 shrink-0 text-[#8b85ff]" />
                <span>
                  Confirmation receipt sent to:{" "}
                  <strong className="text-neutral-200">{customer_email}</strong>
                </span>
              </div>
            )}

            {/* ট্রানজ্যাকশন ও অর্ডার সামারি */}
            <div className="relative mt-6 space-y-3.5 rounded-2xl border border-white/10 bg-[#121217]/80 p-5">
              <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                <span className="flex items-center gap-1.5">
                  <Receipt className="h-3.5 w-3.5 text-neutral-400" />
                  Order Summary
                </span>
                <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                  Paid
                </span>
              </div>

              <div className="space-y-2.5 border-t border-white/5 pt-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Plan</span>
                  <span className="flex items-center gap-1 font-medium text-white">
                    <Zap className="h-3.5 w-3.5 text-[#8b85ff]" />
                    HireLoop Pro Membership
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Total Paid</span>
                  <span className="text-base font-bold text-white">
                    {formattedAmount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-400">Transaction ID</span>
                  <span className="max-w-50 truncate font-mono text-xs text-neutral-400 sm:max-w-none">
                    {transactionId}
                  </span>
                </div>
              </div>
            </div>

            {/* মেম্বারশিপ সুবিধাসমূহ */}
            <div className="relative mt-6 rounded-2xl border border-[#5851ff]/20 bg-[#5851ff]/5 p-4 sm:p-5">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#8b85ff] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Unlocked Pro Benefits
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-neutral-300 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Unlimited Job Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>AI Resume Score Analyzer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Direct Recruiter Messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Featured Candidate Priority</span>
                </div>
              </div>
            </div>

            {/* অ্যাকশন বাটনসমূহ */}
            <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row">
              {/* মেইন বাটন: Apply More Job */}
              <Link
                href="/browse-jobs"
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5851ff]/25 transition-all duration-200 hover:bg-[#4840f0] hover:shadow-[#5851ff]/40 active:scale-[0.99] sm:flex-1"
              >
                <Briefcase className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Apply More Job</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* সেকেন্ডারি বাটন: Dashboard */}
              <Link
                href="/dashboard/seeker"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#121217] px-5 py-3.5 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-[#1a1a22] hover:text-white sm:w-auto"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ফুটার */}
        <footer className="mt-8 text-center text-xs text-neutral-500">
          <p>
            Have questions about your subscription? Contact us at{" "}
            <a
              href="mailto:support@hireloop.com"
              className="text-neutral-400 underline underline-offset-4 hover:text-white"
            >
              support@hireloop.com
            </a>
          </p>
        </footer>
      </div>
    )
  }

  return redirect("/browse-jobs")
}
