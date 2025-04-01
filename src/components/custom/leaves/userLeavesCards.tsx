import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface UserLeavesCardsProps {
  totalLeaves: number;
  availableLeave: number;
}

const UserLeavesCards: React.FC<UserLeavesCardsProps> = ({
  totalLeaves,
  availableLeave,
}) => {
  const usedLeaves = totalLeaves - availableLeave;
  const leavePercentage = (usedLeaves / totalLeaves) * 100;

  const leaveData = [
    { title: "Total Leaves", value: totalLeaves, className: "text-indigo-600" },
    {
      title: "Available Leaves",
      value: availableLeave,
      className: "text-green-600",
    },
    {
      title: "Used Leaves",
      value: usedLeaves,
      className: "text-red-500",
      extra: (
        <>
          <Separator className="my-3" />
          <Progress
            value={leavePercentage}
            className="h-2 rounded-md bg-gradient-to-r from-green-400 to-red-500"
          />
          <p className="text-sm mt-2 text-gray-600">
            {leavePercentage.toFixed(1)}% used
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 p-4">
      {leaveData.map(({ title, value, className, extra }) => (
        <Card
          key={title}
          className="shadow-xl border border-gray-800 rounded-2xl p-4 transition-all transform hover:scale-105 hover:shadow-2xl  hover:from-gray-700"
        >
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-xl font-semibold text-white">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className={`text-3xl font-bold ${className} block mb-2`}>
              {value}
            </span>
            {extra}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserLeavesCards;
