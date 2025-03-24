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
    { title: "Total Leaves", value: totalLeaves, className: "" },
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
          <Separator className="my-2" />
          <Progress value={leavePercentage} className="h-2" />
          <p className="text-sm mt-2 text-gray-600">
            {leavePercentage.toFixed(1)}% used
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 p-2">
      {leaveData.map(({ title, value, className, extra }) => (
        <Card
          key={title}
          className="shadow-lg border border-gray-800 rounded-2xl p-4"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className={`text-2xl font-bold ${className}`}>{value}</span>
            {extra}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserLeavesCards;
