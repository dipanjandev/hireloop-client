"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  CreditCard,
  ExternalLink,
  HelpCircle,
} from "lucide-react"

type CurrencyType = "BDT" | "USD"

export default function PaymentCheckoutPage() {
  const router = useRouter()

  // কারেন্সি সিলেকশন স্টেট (BDT বা USD)
  const [currency, setCurrency] = useState<CurrencyType>("BDT")

  // প্ল্যানের দাম
  const planPrices = {
    BDT: {
      amount: "৳ 2,550",
      period: "/মাস",
      tax: "৳ 0.00",
      total: "৳ 2,550",
      conversionNote: "১ USD ≈ ১২৭.৫০ BDT আনুমানিক",
    },
    USD: {
      amount: "$20.00",
      period: "/month",
      tax: "$0.00",
      total: "$20.00",
      conversionNote: "Billed in USD",
    },
  }

  const selectedPrice = planPrices[currency]

  // 👉 পে বাটন হ্যান্ডলার: এখানে পরবর্তীতে আপনার Stripe Checkout Session / Redirect লজিক বসাবেন
  const handleProceedToStripe = async () => {
    // -------------------------------------------------------------
    // TODO: আপনার Stripe Backend API কল ও Checkout Redirect এখানে লিখবেন
    // উদাহরণ:
    // const res = await fetch("/api/stripe/create-checkout-session", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ currency, planId: "hireloop-pro" }),
    // })
    // const { url } = await res.json()
    // window.location.href = url
    // -------------------------------------------------------------
  }

  return (
    <div className="min-h-screen w-full bg-[#08080c] text-neutral-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* ======================================================== */}
        {/* হেডার: ব্যাক বাটন ও সিকিউরিটি ব্যাজ */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between pb-8 border-b border-white/5">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d14] transition-colors group-hover:border-white/20 group-hover:bg-[#121217]">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* মেইন চেকআউট লেআউট */}
        {/* ======================================================== */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ================= বাম পাশ: প্ল্যান বিবরণী ও পেমেন্ট ইনফো (৭ কলাম) ================= */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5851ff]/30 bg-[#5851ff]/10 px-2.5 py-0.5 text-xs font-semibold text-[#8b85ff]">
                  <Sparkles className="h-3 w-3" />
                  Premium Upgrade
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                HireLoop Pro Membership
              </h1>
              <p className="mt-2 text-sm text-neutral-400">
                Unlock full platform capabilities, unlimited job applications, AI resume
                optimizations, and direct recruiter access.
              </p>
            </div>

            {/* প্ল্যান ফিচার তালিকা */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-6 backdrop-blur-xl">
              <h2 className="text-sm font-semibold tracking-wider text-neutral-300 uppercase">
                What&apos;s Included in Pro
              </h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Unlimited Job Applications per month",
                  "AI-Powered Resume Matcher & Score Analyzer",
                  "Direct Messaging with Verified Recruiters",
                  "Featured Candidate Badge on Recruiter Search",
                  "Real-Time Application Status Tracking & Insights",
                  "Priority 24/7 Support with Career Advisors",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* স্ট্রাইপ সিকিউরিটি ইনফরমেশন নোটিশ */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white flex items-center gap-1.5">
                    Secure Stripe Checkout
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                    When you click the pay button, you will be securely redirected to
                    Stripe&apos;s hosted payment page to complete your payment with Credit Card,
                    Debit Card, or Mobile Banking. No card details are stored on our servers.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400">
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-300 font-mono">
                      VISA
                    </span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-300 font-mono">
                      Mastercard
                    </span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-300 font-mono">
                      Amex
                    </span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-300 font-mono">
                      Stripe Link
                    </span>
                    <span className="text-neutral-500">•</span>
                    <span>PCI-DSS Level 1 Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ডান পাশ: অর্ডার সামারি ও পে বাটন (৫ কলাম) ================= */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-6 backdrop-blur-xl shadow-2xl">
              <h2 className="text-base font-semibold text-white">Order Summary</h2>

              {/* কারেন্সি টগল */}
              <div className="mt-4">
                <label className="text-xs font-medium text-neutral-400">Currency</label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrency("BDT")}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2 px-3 text-xs font-medium transition-all ${
                      currency === "BDT"
                        ? "border-[#5851ff] bg-[#5851ff]/15 text-white shadow-sm"
                        : "border-white/10 bg-[#121217] text-neutral-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span>🇧🇩</span>
                    <span>BDT (৳)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2 px-3 text-xs font-medium transition-all ${
                      currency === "USD"
                        ? "border-[#5851ff] bg-[#5851ff]/15 text-white shadow-sm"
                        : "border-white/10 bg-[#121217] text-neutral-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>USD ($)</span>
                  </button>
                </div>
              </div>

              {/* প্রাইসিং ব্রেকডাউন */}
              <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>HireLoop Pro Plan</span>
                  <span className="font-semibold text-white">
                    {selectedPrice.amount}
                    <span className="text-xs text-neutral-400 font-normal">
                      {selectedPrice.period}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-1">
                    Tax / VAT
                    <HelpCircle className="h-3.5 w-3.5 text-neutral-500" />
                  </span>
                  <span>{selectedPrice.tax}</span>
                </div>

                <div className="text-[11px] text-neutral-500">{selectedPrice.conversionNote}</div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-base font-semibold">
                  <span className="text-white">Total Due Today</span>
                  <span className="text-xl font-bold text-white tracking-tight">
                    {selectedPrice.total}
                  </span>
                </div>
              </div>

              {/* পে বাটন */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleProceedToStripe}
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5851ff]/25 transition-all duration-200 hover:bg-[#4840f0] hover:shadow-[#5851ff]/40 active:scale-[0.99]"
                >
                  <Lock className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>Proceed to Stripe Payment</span>
                </button>
                <p className="mt-2 text-center text-[11px] text-neutral-400">
                  Redirects to Stripe&apos;s encrypted checkout session.
                </p>
              </div>

              {/* মানি-ব্যাক গ্যারান্টি */}
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>30-day money-back guarantee. Cancel anytime.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ফুটার ================= */}
      <footer className="mt-12 text-center text-xs text-neutral-500 border-t border-white/5 pt-6">
        <p>
          Powered by <span className="font-semibold text-neutral-400">Stripe</span> • Safe &amp;
          Secure Payments
        </p>
        <div className="mt-2 flex justify-center gap-4 text-[11px] text-neutral-400">
          <button type="button" className="hover:underline">
            Terms of Service
          </button>
          <span>•</span>
          <button type="button" className="hover:underline">
            Privacy Policy
          </button>
          <span>•</span>
          <button type="button" className="hover:underline">
            Refund Policy
          </button>
        </div>
      </footer>
    </div>
  )
}
