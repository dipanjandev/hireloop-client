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

const menuItemByRole = {
  admin: [],
  seeker: [],
  recruiter: [],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = session?.user.role || "seeker"

  return (
    <Sidebar>
      <SidebarHeader>
        <button className="cursor-pointer rounded-2xl border border-amber-800 bg-slate-700 px-5 py-3">
          Back To Home - Understand The Header Section
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {
            // menuItemByRole[role].map((item) => (
            //   <SidebarMenuItem key={item.id}>
            //     <SidebarMenuButton render={<a href={item.url} />}>
            //       <item.icon />
            //       <span>{item.name}</span>
            //     </SidebarMenuButton>
            //   </SidebarMenuItem>
            // ))
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <button className="cursor-pointer rounded-2xl border border-amber-800 bg-slate-700 px-5 py-3">
          <Link href={"/"}>Back To Home - Understand the footer Section</Link>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
