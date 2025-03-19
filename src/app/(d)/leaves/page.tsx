import UserLeavesCards from "@/components/custom/leaves/userLeavesCards";
import UserLeaveTable from "@/components/custom/leaves/userLeaveTable";
import { getCookie } from "@/global/getCookie";
import React from "react";

const page = async () => {
  const token = await getCookie("token");

  const getMe = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ token: token }),
  });

  const { user } = await getMe.json();

  const getMyLeaves = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL!}/personal-leaves/${user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );

  const getLeaveBalance = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL!}/leaves-balance/${user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );

  const myLeaves = await getMyLeaves.json();
  const { userLeave } = await getLeaveBalance.json();

  return (
    <div className="flex flex-col gap-4">
      <UserLeavesCards
        totalLeaves={userLeave.totalLeaves}
        availableLeave={userLeave.availableLeave}
      />

      <UserLeaveTable userLeaves={myLeaves} />
    </div>
  );
};

export default page;
