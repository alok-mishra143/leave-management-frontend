"use server";

import LeaveTable from "@/components/custom/request-leaves/leaveTable";
import { getCookie } from "@/global/getCookie";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
    const token = await getCookie("token");

    const { page, limit, status, search, col, sort } = await searchParams;

    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));
    if (status) queryParams.append("status", String(status));
    if (search) queryParams.append("search", String(search));
    if (col) queryParams.append("col", String(col));
    if (sort) queryParams.append("sort", String(sort));

    const leaves = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/leaves?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      }
    );

    if (!leaves.ok) throw new Error("Failed to fetch leaves");

    const data = await leaves.json();

    return (
      <div className="w-full">
        <LeaveTable Leaves={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching leaves: ", error);
    return <div>Failed to load leaves. Please try again later.</div>;
  }
};

export default Page;
