"use server";

import UserLeavesCards from "@/components/custom/leaves/userLeavesCards";
import UserLeaveTable from "@/components/custom/leaves/userLeaveTable";
import { getCookie } from "@/global/getCookie";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
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
    const { page, limit, status, search, col, sort } = await searchParams;

    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));
    if (status) queryParams.append("status", String(status));
    if (search) queryParams.append("search", String(search));
    if (col) queryParams.append("col", String(col));
    if (sort) queryParams.append("sort", String(sort));

    const getMyLeaves = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/personal-leaves/${
        user.id
      }/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!getMyLeaves.ok) throw new Error("Failed to fetch leaves");

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

    if (!getLeaveBalance.ok) throw new Error("Failed to fetch leave balance");

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
  } catch (error) {
    console.error("Error fetching data: ", error);
    return <div>Failed to load data. Please try again later.</div>;
  }
};

export default page;
