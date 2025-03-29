"use server";

import SettingProfile from "@/components/custom/setting/setting";
import { getCookie } from "@/global/getCookie";
import React from "react";

const Page = async () => {
  try {
    const token = await getCookie("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/whoami`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = (await response.json()).user;

    return <SettingProfile {...data} />;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return <div>Error: {(error as Error).message}</div>;
  }
};

export default Page;
