"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  User,
  MessageSquare,
  Settings,
  PlusCircle,
  Briefcase,
  Users,
  Building2,
  BarChart3,
  ShieldCheck,
} from "lucide-react"
import Image from "next/image"

// ১. সাইডবার মেনু আইটেমের টাইপস্ক্রিপ্ট ইন্টারফেস
export interface SidebarMenuItemType {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

// ২. সমর্থিত রোল টাইপ
export type RoleType = "seeker" | "recruiter" | "admin"

// ৩. ফিগমা UI ও রোল অনুযায়ী সাইডবার আইটেমসমূহ
const menuItemByRole: Record<RoleType, SidebarMenuItemType[]> = {
  // চাকরিপ্রার্থী (Seeker)
  seeker: [
    {
      id: "seeker-overview",
      name: "Overview",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-jobs",
      name: "Browse Jobs",
      url: "/jobs",
      icon: Search,
    },
    {
      id: "seeker-applications",
      name: "My Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-saved",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved",
      icon: Bookmark,
    },
    {
      id: "seeker-profile",
      name: "My Profile",
      url: "/dashboard/seeker/profile",
      icon: User,
    },
    {
      id: "seeker-messages",
      name: "Messages",
      url: "/dashboard/seeker/messages",
      icon: MessageSquare,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],

  // নিয়োগকারী / কোম্পানি (Recruiter)
  recruiter: [
    {
      id: "recruiter-overview",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-post-job",
      name: "Post a Job",
      url: "/dashboard/recruiter/post-job",
      icon: PlusCircle,
    },
    {
      id: "recruiter-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "recruiter-candidates",
      name: "Candidates",
      url: "/dashboard/recruiter/candidates",
      icon: Users,
    },
    {
      id: "recruiter-company",
      name: "Company Profile",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      id: "recruiter-messages",
      name: "Messages",
      url: "/dashboard/recruiter/messages",
      icon: MessageSquare,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],

  // প্ল্যাটফর্ম প্রশাসক (Admin)
  admin: [
    {
      id: "admin-overview",
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users Management",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "admin-jobs",
      name: "Job Approvals",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-analytics",
      name: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    {
      id: "admin-settings",
      name: "Platform Settings",
      url: "/dashboard/admin/settings",
      icon: ShieldCheck,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const role =
    ((session?.user as { role?: RoleType })?.role as RoleType) || "seeker"
  const currentMenuItems = menuItemByRole[role] || menuItemByRole.seeker

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
        >
          <Image
            src={"/images/logo.png"}
            alt="hireloop-logo"
            width={100}
            height={50}
          />
          <span className="ml-auto rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-normal text-neutral-400 capitalize">
            {role}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {currentMenuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
