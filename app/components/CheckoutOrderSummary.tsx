"use client"
import { useState } from "react"
import { HelpCircle, ShieldCheck } from "lucide-react"

type CurrencyType = "BDT" | "USD"

const CheckoutOrderSummary = () => {
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

  return (
    <div className="sticky top-8 rounded-2xl border border-white/10 bg-[#0d0d14]/90 p-6 shadow-2xl backdrop-blur-xl">
      <h2 className="text-base font-semibold text-white">Order Summary</h2>

      {/* কারেন্সি টগল */}
      <div className="mt-4">
        <label className="text-xs font-medium text-neutral-400">Currency</label>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setCurrency("BDT")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
              currency === "BDT"
                ? "border-[#5851ff] bg-[#5851ff]/15 text-white shadow-sm"
                : "border-white/10 bg-[#121217] text-neutral-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <span>🇧🇩</span>
            <span>BDT (৳)</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
              currency === "USD"
                ? "border-[#5851ff] bg-[#5851ff]/15 text-white shadow-sm"
                : "border-white/10 bg-[#121217] text-neutral-400 hover:border-white/20 hover:text-white"
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
            <span className="text-xs font-normal text-neutral-400">
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

        <div className="text-[11px] text-neutral-500">
          {selectedPrice.conversionNote}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold">
          <span className="text-white">Total Due Today</span>
          <span className="text-xl font-bold tracking-tight text-white">
            {selectedPrice.total}
          </span>
        </div>
      </div>

      {/* পে বাটন */}
      <div className="mt-6">
        <p className="mt-2 text-center text-[11px] text-neutral-400">
          Redirects to Stripe&apos;s encrypted checkout session.
        </p>
      </div>

      {/* মানি-ব্যাক গ্যারান্টি */}
      <div className="mt-6 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>30-day money-back guarantee. Cancel anytime.</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutOrderSummary
