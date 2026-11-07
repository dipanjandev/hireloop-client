"use client"

import React from "react"
import Image from "next/image"
import { Search, MapPin, Briefcase, Building2, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const statsData = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfication Rate" },
]

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#050508] px-4 pt-24 pb-16 text-white md:pt-32">
      {/* ============================================================ */}
      {/* ১. ফুল ব্যাকগ্রাউন্ড ইমেজ লেয়ার (সবার পেছনে পুরো স্ক্রিন জুড়ে) */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <Image
          src="/images/globe_only.png"
          alt="HireLoop Hero Glow & Globe Background"
          fill
          priority
          //   width={5000}
          //   height={5000}
          //   sizes="100vw"
          className="translate-y-24 scale-110 object-cover object-top sm:translate-y-32 md:translate-y-55"
        />
        {/* নিচের কার্ডগুলোর সাথে ব্যাকগ্রাউন্ড ব্লেন্ড করার জন্য ডার্ক ফেড */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#050508] via-[#050508]/80 to-transparent" />
      </div>

      {/* ২. ওপরের কন্টেন্ট লেয়ার (Search & Headline) */}

      <div className="relative z-10 mx-auto mt-4 flex w-full max-w-4xl flex-col items-center text-center">
        {/* টপ ব্যাজ */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#16161e]/80 px-4 py-1.5 text-xs text-neutral-300 shadow-xl backdrop-blur-md sm:mb-8">
          <span>💼</span>
          <span className="font-semibold tracking-wide text-white">
            50,000+
          </span>
          <span className="text-[10px] tracking-wider text-neutral-400 uppercase sm:text-[11px]">
            New Jobs This Month
          </span>
        </div>

        {/* মেইন হেডলাইন */}
        <h1 className="max-w-3xl text-4xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* সাবটাইটেল */}
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* সার্চ বার */}
        <div className="mt-8 flex w-full max-w-2xl flex-col items-center gap-2 rounded-2xl border border-white/10 bg-[#0f0f15]/90 p-2 shadow-2xl backdrop-blur-xl sm:flex-row sm:rounded-full">
          <div className="flex w-full items-center gap-3 border-white/10 px-4 py-2 sm:border-r">
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              type="text"
              placeholder="Job tilte, skill or company"
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <div className="flex w-full items-center gap-3 px-4 py-2">
            <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <Button
            size="icon"
            className="h-11 w-full shrink-0 cursor-pointer rounded-xl bg-[#5851ff] text-white shadow-[0_0_20px_rgba(88,81,255,0.4)] hover:bg-[#473ff0] sm:w-11 sm:rounded-full"
          >
            <Search className="h-4 w-4" />
            <span className="ml-2 text-sm font-medium sm:hidden">
              Search Jobs
            </span>
          </Button>
        </div>

        {/* ট্রেন্ডিং পজিশন বাটনসমূহ */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="mr-1 font-medium text-neutral-400">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              className="cursor-pointer rounded-full border border-white/10 bg-[#14141c]/80 px-3.5 py-1.5 text-neutral-300 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      {/* ৩. নিচের কন্টেন্ট লেয়ার (Globe Overlay Text & Cards) */}

      <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-col items-center sm:mt-50">
        {/* গ্লোবের ওপরে থাকা টেক্সট */}
        <div className="mb-10 px-4 text-center sm:mb-16">
          <p className="mx-auto max-w-xl text-xl leading-snug font-medium text-neutral-200 sm:text-2xl md:text-3xl">
            Assisting over{" "}
            <span className="font-bold text-white">15,000 job seekers</span>{" "}
            find their dream positions.
          </p>
        </div>

        {/* নিচের ৪টি স্ট্যাটাস কার্ড */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="rounded-2xl border-white/10 bg-[#0b0b10]/85 text-left shadow-xl backdrop-blur-md transition-all hover:border-white/20"
              >
                <CardContent className="flex h-full min-h-35 flex-col justify-between p-6">
                  <div className="flex h-8 w-8 items-center rounded-lg text-neutral-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {stat.value}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-neutral-400 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
