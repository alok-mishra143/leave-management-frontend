"use client";

import { LeaveStatus } from "@/global/constent";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import LeaveBadge from "../request-leaves/leaveBadge";
import CustomPagination from "../shared/Pagination";
import { LeaveRequestFilters } from "../shared/leaveFilter";
import ApplyLeave from "./applyLeave";
import EditLeave from "./editLeave";
import { LeaveSchema } from "../../../..";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/global/getCookie";
import { toast } from "sonner";
import CustomTableHeader from "../shared/TableHeader";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UserLeaveTableProps {
  data: LeaveSchema[];
  pagination: Pagination;
}

const TableHeadings = [
  { key: "requestedTo", label: "Requested To" },
  { key: "approvedBy", label: "Approved By" },
  { key: "leaveType", label: "Leave Type" },
  { key: "reason", label: "Reason" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "status", label: "Status" },
];

const UserLeaveTable = ({
  userLeaves,
}: {
  userLeaves: UserLeaveTableProps;
}) => {
  const [loadingLeaveId, setLoadingLeaveId] = useState<string | null>(null);
  const router = useRouter();

  const { data, pagination } = userLeaves;

  const deleteLeave = async (id: string) => {
    setLoadingLeaveId(id);
    try {
      const token = await getCookie("token");
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/delete-leave/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      router.refresh();
      toast.success("Leave deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete leave.");
      console.error(error);
    } finally {
      setLoadingLeaveId(null);
    }
  };

  return (
    <div>
      <div className=" flex justify-between items-center mb-4 p-2">
        <ApplyLeave />
        <LeaveRequestFilters />
      </div>

      <Table>
        <TableHeader>
          <CustomTableHeader TableHeadings={TableHeadings} />
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((leave) => (
              <TableRow
                key={leave.id}
                className={
                  loadingLeaveId === leave.id
                    ? "animate-pulse opacity-70 blur-[1px] transition-all duration-300"
                    : "transition-all duration-300"
                }
              >
                <TableCell>{leave.requestedTo.name}</TableCell>
                <TableCell>{leave.approvedBy?.name || "N/A"}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>
                  {new Date(leave.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(leave.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <LeaveBadge status={leave.status} />
                </TableCell>
                <TableCell>
                  {leave.status === LeaveStatus.PENDING && (
                    <div
                      className={
                        loadingLeaveId === leave.id
                          ? "animate-pulse flex gap-1 opacity-30"
                          : "flex gap-1 "
                      }
                    >
                      <EditLeave myLeave={leave} />
                      <Button
                        variant={"ghost"}
                        onClick={() => deleteLeave(leave.id)}
                        disabled={loadingLeaveId === leave.id}
                      >
                        <Trash className="text-red-600" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              You have no leaves.
            </p>
          )}
        </TableBody>
      </Table>

      <CustomPagination pagination={pagination} />
    </div>
  );
};

export default UserLeaveTable;
