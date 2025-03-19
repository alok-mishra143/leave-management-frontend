"use client";

import axiosInstance from "@/lib/customAxiosInstence";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const clearCookies = async () => {
    try {
      await axiosInstance.post("/logout");
      router.replace("/");
    } catch (error) {
      console.error("Error clearing cookies:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-red-800 p-4 text-center">
      <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
      <p className="mt-2 text-lg">
        We&apos;re experiencing an issue. Please try again later.
      </p>
      <button
        onClick={clearCookies}
        className="mt-4 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
      >
        Clear Cookies & Reload
      </button>
    </div>
  );
};

export default ErrorPage;
