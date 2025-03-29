"use server";
export const dynamic = "force-dynamic";

import CalendarApp from "@/components/custom/dashboard/LeaveCalender";
import { getCookie } from "@/global/getCookie";
import React from "react";

const page = async () => {
  try {
    const token = await getCookie("token");

    const leaves = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        cache: "no-store",
      }
    );

    if (!leaves.ok) throw new Error("Failed to fetch dashboard data");

    const data = await leaves.json();

    return (
      <div className="overflow-hidden h-full">
        <CalendarApp events={data.data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
    return <div>Failed to load calendar. Please try again later.</div>;
  }
};

export default page;
