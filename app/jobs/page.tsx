import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export default function JobsPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#161622] text-[#5851ff] shadow-[0_0_30px_rgba(88,81,255,0.3)]">
        <Search className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
        Explore Curated Opportunities
      </h1>
      <p className="mt-3 max-w-lg text-sm text-neutral-400">
        Jobs directory and search results are getting ready. Stay tuned as we roll out direct listings from top companies!
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5851ff] px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(88,81,255,0.4)] transition-all hover:bg-[#473ff0]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}
