"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { LogOut, Settings, ChevronsUpDown } from "lucide-react";
import axiosInstance from "@/lib/customAxiosInstence";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { userCookieInterface } from "../../..";

const CustomFooter = ({ user }: { user: userCookieInterface }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const currentUser = user;

  const userLogOut = async () => {
    try {
      await axiosInstance.post("/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-accent p-5   ">
              <div className="flex items-center space-x-3 ">
                <Avatar className="h-9 w-9 border border-border rounded-full shadow-sm items-center justify-center">
                  <AvatarImage
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="rounded-full "
                  />
                  <AvatarFallback className="bg-muted text-sm font-medium uppercase">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {currentUser.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-muted-foreground opacity-70 transition group-hover:opacity-100" />
            </SidebarMenuButton>
          </PopoverTrigger>

          <PopoverContent
            className="w-64 p-4 shadow-lg rounded-lg border"
            align="start"
            side="right"
          >
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentUser.email}
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Role: {currentUser.role}
              </p>
            </div>

            <Separator className="my-3" />

            <div className="flex flex-col space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start hover:bg-accent cursor-pointer"
                onClick={() => {
                  router.push("/settings");
                  setOpen(false);
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={userLogOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default CustomFooter;
