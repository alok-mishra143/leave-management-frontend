import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import axiosInstance from "@/lib/customAxiosInstence";
import { cookies } from "next/headers";
import React from "react";
import { userCookieInterface } from "../../..";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const token = cookieStore.get("token")?.value || "";

  const respo = await axiosInstance.post("/me", { token });
  const User: userCookieInterface = respo.data?.user || {};

  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar {...User} />

        <main className="w-full overflow-hidden ">
          <header className="p-1 flex gap-2 flex-col">
            {" "}
            <div className="flex justify-between items-center">
              {" "}
              <SidebarTrigger />
              <ThemeToggle />
            </div>
            <Separator />
          </header>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
