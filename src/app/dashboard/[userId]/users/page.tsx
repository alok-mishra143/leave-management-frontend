"use server";

import React from "react";
import { cookies } from "next/headers";
import UserTable from "@/components/custom/users/userTable";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const { roleID, search, limit, page, sort, col } = await searchParams;

  const queryParams = new URLSearchParams();

  if (roleID) queryParams.append("roleID", String(roleID));
  if (search) queryParams.append("search", String(search));
  if (limit) queryParams.append("limit", String(limit));
  if (page) queryParams.append("page", String(page));
  if (sort) queryParams.append("sort", String(sort));
  if (col) queryParams.append("col", String(col));

  const allUser = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL!}/users?${queryParams.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    }
  );
  const data = await allUser.json();
  return (
    <div className="w-full ">
      <UserTable AllUsers={data} />
    </div>
  );
};

export default Page;
