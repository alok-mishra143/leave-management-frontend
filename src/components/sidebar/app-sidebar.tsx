"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Role } from "@/global/constent";
import {
  LayoutDashboard,
  User,
  NotepadText,
  Calendar1,
  ChevronRight,
} from "lucide-react";
import CustomFooter from "./sideBarPopover";
import Link from "next/link";
import { userCookieInterface } from "../../..";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    roles: [Role.ADMIN, Role.STAFF, Role.STUDENT, Role.HOD],
  },
  {
    icon: User,
    label: "All Users",
    href: "/users",
    roles: [Role.ADMIN, Role.HOD],
  },
  {
    icon: NotepadText,
    label: "Leaves",
    href: "/leaves",
    roles: [Role.STUDENT, Role.STAFF, Role.HOD],
  },
  {
    icon: Calendar1,
    label: "Leave Requests",
    href: "/leave-requests",
    children: [
      {
        icon: Calendar1,
        label: "All Requests",
        href: "/leave-requests?leave=all",
        roles: [Role.HOD, Role.ADMIN],
      },
    ],
    roles: [Role.ADMIN, Role.STAFF, Role.HOD],
  },
];

export function AppSidebar(user: userCookieInterface) {
  const role = user.roleId;
  const pathname = usePathname();
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role as Role)
  );

  return (
    <Sidebar>
      <SidebarHeader>Menu</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {filteredItems.map((item, index) => (
            <SidebarGroupContent key={index}>
              {/* Main item */}
              <Collapsible className="group/collapsible">
                <div className="flex">
                  <SidebarMenuButton asChild isActive={item.href === pathname}>
                    <Link
                      href={item.href}
                      className="flex items-center p-3 space-x-3 "
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>

                  <CollapsibleTrigger>
                    {item.children && (
                      <ChevronRight className="ml-auto w-4 h-4 transition-transform group-[data-state=open]:rotate-90" />
                    )}
                  </CollapsibleTrigger>
                </div>
                {item.children && (
                  <CollapsibleContent>
                    <div className="pl-6">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                        >
                          <child.icon className="w-5 h-5" />
                          <span className="text-sm">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            </SidebarGroupContent>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <CustomFooter user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
