import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-6 bg-background/60 backdrop-blur-md p-6">
      <div className="w-40 h-10">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-full max-w-4xl p-4 border rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="p-4">
                  <Skeleton className="h-6 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t">
                {[...Array(5)].map((_, j) => (
                  <td key={j} className="p-4">
                    <Skeleton className="h-6 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loading;
