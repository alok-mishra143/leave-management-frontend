import BlogPage from "@/components/custom/blogs/BlogPage";
import { getCookie } from "@/global/getCookie";
import React from "react";

const page = async () => {
  const token = await getCookie("token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return (
    <div>
      <BlogPage data={data.data} pagination={data.pagination} />
    </div>
  );
};

export default page;
