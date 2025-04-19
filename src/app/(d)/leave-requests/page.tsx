export const dynamic = "force-dynamic";

import LeaveTable from "@/components/custom/request-leaves/leaveTable";
import { customFetch } from "@/lib/customRCS";
import React from "react";
import { leaveRequestsProps } from "../../../..";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
    const { page, limit, status, search, col, sort, leave } =
      await searchParams;

    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));
    if (status) queryParams.append("status", String(status));
    if (search) queryParams.append("search", String(search));
    if (col) queryParams.append("col", String(col));
    if (sort) queryParams.append("sort", String(sort));
    if (leave) queryParams.append("leave", String(leave));

    const url = `${process.env
      .NEXT_PUBLIC_BASE_URL!}/leaves?${queryParams.toString()}`;

    const data: leaveRequestsProps = await customFetch({ url });

    return (
      <div>
        <LeaveTable Leaves={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching leaves: ", error);
    return <div>Failed to load leaves. Please try again later.</div>;
  }
};

export default Page;
