"use client"
// import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { authClient, useSession } from "@/lib/auth-client"

interface NavItem {
  title: string
  href: string
}

const NavBar = () => {
  const { data: session } = useSession()
  // console.log("user session", session?.user)
  const userSession = session?.user

  // Navigation Links
  const navLinks: NavItem[] = [
    { title: "Browse Jobs", href: "/browse-jobs" },
    { title: "Company", href: "/company" },
    { title: "Pricing", href: "/pricing" },
    { title: "Dashboard", href: `/dashboard/${userSession?.role}` },
  ]

  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 sm:px-6 lg:px-8">
      {/* Container: Dark floating pill style as per design */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#17171a]/95 px-6 shadow-2xl backdrop-blur-md transition-all sm:px-8">
        {/* Left: Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative flex h-9 w-36 items-center">
            <Image
              src="/images/logo.png"
              alt="hireloop"
              width={140}
              height={36}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center/Right Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium text-neutral-300 lg:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="transition-colors duration-200 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="mx-1 h-4 w-px bg-neutral-700" />

          {/* Action Links & Buttons */}
          <div className="flex items-center gap-4">
            {userSession ? (
              <>
                <span>Welcome, {userSession.name}</span>
                <Button
                  onClick={handleSignOut}
                  className="h-11 rounded-xl bg-red-500 px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-2 py-1 text-sm font-medium text-[#7056ff] transition-colors duration-200 hover:text-[#8a75ff]"
                >
                  Sign In
                </Link>

                <Button className="h-11 rounded-xl bg-[#5851ff] px-6 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(88,81,255,0.4)] transition-all duration-200 hover:bg-[#4b43f0] hover:shadow-[0_0_25px_rgba(88,81,255,0.6)]">
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile / Tablet Menu (shadcn Sheet) */}
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-neutral-300 hover:bg-neutral-800/80 hover:text-white"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-70 flex-col justify-between border-neutral-800 bg-[#17171a] p-6 sm:w-[320px]"
            >
              <div className="mt-4 flex flex-col gap-6">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-bold">
                    <span className="text-[#0091ff]">hire</span>
                    <span className="text-[#ff7300]">loop</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-4 text-base font-medium text-neutral-300">
                  {navLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-2 py-2 transition-colors hover:bg-neutral-800 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="flex flex-col gap-3 border-t border-neutral-800 pt-6">
                {userSession ? (
                  <span>Welcome, {userSession.name}</span>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setIsOpen(false)}
                      className="w-full rounded-lg py-2.5 text-center text-sm font-medium text-[#7056ff] transition-colors hover:text-[#8a75ff]"
                    >
                      Sign In
                    </Link>

                    <Button className="h-11 w-full rounded-xl bg-[#5851ff] font-medium text-white shadow-[0_0_15px_rgba(88,81,255,0.3)] hover:bg-[#4b43f0]">
                      <Link
                        href="/get-started"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default NavBar
