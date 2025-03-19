"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { leaveRequestapplyProps } from "../../../..";
import { LeaveStatus } from "@/global/constent";
import { getCookie } from "@/global/getCookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateLeave = ({ leaveData }: { leaveData: leaveRequestapplyProps }) => {
  const router = useRouter();
  const { id, status } = leaveData;

  const [selectedValue, setSelectedValue] = React.useState(status);

  const updateLeave = async (newStatus: string) => {
    try {
      const token = await getCookie("token");

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/leave/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      // const data = await responce.json();
      router.refresh();

      toast.success(`Leave Updated Successfully ${newStatus}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Select
        value={selectedValue}
        onValueChange={(value: string) => {
          setSelectedValue(value as LeaveStatus);
          updateLeave(value);
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Leave Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={LeaveStatus.APPROVED}>APPROVE</SelectItem>
            <SelectItem value={LeaveStatus.REJECTED}>REJECT</SelectItem>
            <SelectItem value={LeaveStatus.PENDING} disabled>
              PENDING
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UpdateLeave;
