import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full relative ">
      <Skeleton className="w-full h-full rounded-lg bg-black" />
      <Loader className="w-12 h-12 absolute animate-spin text-blue-500" />
    </div>
  );
};

export default Loading;
