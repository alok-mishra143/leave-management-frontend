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

  return (
    <div className="grid gap-4 sm:grid-cols-3 p-2">
      <Card className="shadow-md rounded-2xl p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">Total Leaves</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-bold">
          {totalLeaves}
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-2xl p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">
            Available Leaves
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-bold text-green-600">
          {availableLeave}
        </CardContent>
      </Card>

      <Card className="shadow-md rounded-2xl p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">Used Leaves</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <span className="text-2xl font-bold text-red-500">{usedLeaves}</span>
          <Separator className="my-2" />
          <Progress value={leavePercentage} className="h-2" />
          <p className="text-sm mt-2 text-gray-600">
            {leavePercentage.toFixed(1)}% used
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLeavesCards;
