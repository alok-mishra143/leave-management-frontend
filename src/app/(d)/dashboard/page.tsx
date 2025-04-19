/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";

import CalendarApp from "@/components/custom/dashboard/LeaveCalender";
import { customFetch } from "@/lib/customRCS";
import React, { use } from "react";

interface DashboardResponse {
  data: any[];
}

const Page = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL!}/dashboard`;
  const data = use(customFetch({ url })) as DashboardResponse;

  return (
    <div className="overflow-hidden h-full">
      <CalendarApp events={data.data} />
      hhh
    </div>
  );
};

export default Page;
