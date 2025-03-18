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

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/d",
    roles: [Role.ADMIN, Role.STAFF, Role.STUDENT],
  },
  {
    icon: User,
    label: "All Users",
    href: "/users",
    roles: [Role.ADMIN],
  },
  {
    icon: NotepadText,
    label: "Leaves",
    href: "/leaves",
    roles: [Role.STUDENT],
  },
  {
    icon: Calendar1,
    label: "Leave Requests",
    href: "/leave-requests",
    roles: [Role.ADMIN, Role.STAFF],
  },
];

export function AppSidebar(user: userCookieInterface) {
  const role = user.roleId;
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role as Role)
  );

  const customLink = `http://localhost:3000/dashboard/${user.id}`;

  return (
    <Sidebar>
      <SidebarHeader>Menu</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {filteredItems.map((item, index) => (
            <Link
              key={index}
              href={`${customLink}${item.href}`}
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
