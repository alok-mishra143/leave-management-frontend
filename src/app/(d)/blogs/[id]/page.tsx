import { getCookie } from "@/global/getCookie";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const token = await getCookie("token");
  return <div>page</div>;
};

export default page;
