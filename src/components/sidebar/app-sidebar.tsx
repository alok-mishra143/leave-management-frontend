import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Role } from "@/global/constent";
import { LayoutDashboard, User, NotepadText, Calendar1 } from "lucide-react";
import CustomFooter from "./sideBarPopover";
import Link from "next/link";
import { userCookieInterface } from "../../..";

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
    roles: [Role.STUDENT, Role.STAFF],
  },
  {
    icon: Calendar1,
    label: "Leave Requests",
    href: "/leave-requests",
    roles: [Role.ADMIN, Role.STAFF, Role.HOD],
  },
];

export function AppSidebar(user: userCookieInterface) {
  const role = user.roleId;
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role as Role)
  );

  return (
    <Sidebar>
      <SidebarHeader>Menu</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {filteredItems.map((item, index) => (
            <Link
              key={index}
              href={`${item.href}`}
              className="flex items-center p-2 space-x-2"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <CustomFooter user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
