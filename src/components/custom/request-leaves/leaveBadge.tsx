import { LeaveStatus } from "@/global/constent";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface LeaveBadgeProps {
  status: LeaveStatus.APPROVED | LeaveStatus.PENDING | LeaveStatus.REJECTED;
}

const statusStyles = {
  [LeaveStatus.APPROVED]:
    "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-400 dark:border-green-600",
  [LeaveStatus.PENDING]:
    "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-400 dark:border-yellow-600",
  [LeaveStatus.REJECTED]:
    "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-400 dark:border-red-600",
};

const LeaveBadge: React.FC<LeaveBadgeProps> = ({ status }) => {
  return (
    <Badge
      className={`${statusStyles[status]} px-3 py-1 rounded-full font-medium shadow-md transition-all duration-300`}
    >
      {status}
    </Badge>
  );
};

export default LeaveBadge;
