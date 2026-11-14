import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  CreditCard,
  ExternalLink,
  Lock,
} from "lucide-react"
import Link from "next/link"
import CheckoutOrderSummary from "../components/CheckoutOrderSummary"

export default async function PaymentCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-[#08080c] px-4 py-8 text-neutral-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* হেডার: ব্যাক বাটন ও সিকিউরিটি ব্যাজ */}
        <div className="flex items-center justify-between border-b border-white/5 pb-8">
          <Link
            href="/browse-jobs"
            className="group flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d14] transition-colors group-hover:border-white/20 group-hover:bg-[#121217]">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span>Back</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* মেইন চেকআউট লেআউট */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ================= বাম পাশ: প্ল্যান বিবরণী ও পেমেন্ট ইনফো (৭ কলাম) ================= */}
          <div className="space-y-6 lg:col-span-7">
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
                Unlock full platform capabilities, unlimited job applications,
                AI resume optimizations, and direct recruiter access.
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
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-neutral-300"
                  >
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
                  <h3 className="flex items-center gap-1.5 text-sm font-medium text-white">
                    Secure Stripe Checkout
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                    When you click the pay button, you will be securely
                    redirected to Stripe&apos;s hosted payment page to complete
                    your payment with Credit Card, Debit Card, or Mobile
                    Banking. No card details are stored on our servers.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400">
                    <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-neutral-300">
                      VISA
                    </span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-neutral-300">
                      Mastercard
                    </span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-neutral-300">
                      Amex
                    </span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-neutral-300">
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
          <div className="space-y-5 lg:col-span-5">
            {/* ChekOutOrderSummary */}
            <CheckoutOrderSummary />

            {/* Payment Button : এখানে আমরা স্ট্রাইপ থেকে বাটন এনে কাজ করলাম। */}

            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button
                  type="submit"
                  role="link"

                  className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5851ff] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5851ff]/25 transition-all duration-200 hover:bg-[#4840f0] hover:shadow-[#5851ff]/40 active:scale-[0.99]"
                >
                  <Lock className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>Proceed to Stripe Payment</span>
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>

      {/* ================= ফুটার ================= */}
      <footer className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-neutral-500">
        <p>
          Powered by{" "}
          <span className="font-semibold text-neutral-400">Stripe</span> • Safe
          &amp; Secure Payments
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
