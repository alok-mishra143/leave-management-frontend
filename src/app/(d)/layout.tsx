"use server";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="relative">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar {...testDt.user} />
        <div className="fixed top-1 left-2 z-50  ">
          <SidebarTrigger />
        </div>

        <main className="w-full overflow-hidden">
          <header className="p-1 flex flex-col gap-2">
            <Separator />
          </header>
          <div className="p-5">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
