import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const token = cookieStore.get("token")?.value || "";

  const test = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/test`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  const testDt = await test.json();
  // console.log("this is test data", testDt);

  // console.log(respo.data);

  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar {...testDt.user} />

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
