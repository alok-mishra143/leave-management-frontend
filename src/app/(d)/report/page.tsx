import { LeaveChartComponent } from "@/components/custom/chart/CustomChart";
import { getCookie } from "@/global/getCookie";
import React from "react";

const page = async () => {
  const token = await getCookie("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  const data = await res.json();

  return (
    <div>
      <LeaveChartComponent leaveData={data.data} />
    </div>
  );
};

export default page;
