"use client";

import { LeaveStatus } from "@/global/constent";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Trash } from "lucide-react";
import LeaveBadge from "../request-leaves/leaveBadge";
import CustomPagination from "../shared/Pagination";
import { LeaveRequestFilters } from "../shared/leaveFilter";
import ApplyLeave from "./applyLeave";
import EditLeave from "./editLeave";
import { LeaveSchema } from "../../../..";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/global/getCookie";
import { toast } from "sonner";

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
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const col = searchParams.get("col") || "startDate";
  const sort = searchParams.get("sort") || "asc";

  const { data, pagination } = userLeaves;

  const handleSort = (columnKey: string) => {
    const newSort = col === columnKey && sort === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("col", columnKey);
    params.set("sort", newSort);
    router.push(`?${params.toString()}`);
  };

  const deleteLeave = async (id: string) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto p-2">
      <div className=" flex justify-between items-center mb-4 p-2">
        <ApplyLeave />
        <LeaveRequestFilters />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {TableHeadings.map(({ key, label }) => (
              <TableHead key={key} onClick={() => handleSort(key)}>
                <div className="flex gap-1 items-center cursor-pointer">
                  {label}
                  <ArrowUpDown
                    size={16}
                    className={`transition-transform ${
                      col === key
                        ? sort === "asc"
                          ? "rotate-180"
                          : ""
                        : "opacity-30"
                    }`}
                  />
                </div>
              </TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((leave) => (
              <TableRow
                key={leave.id}
                className={loading ? "animate-pulse opacity-50" : ""}
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
                        loading
                          ? "animate-pulse flex gap-1 opacity-30"
                          : "flex gap-1"
                      }
                    >
                      <EditLeave myLeave={leave} />
                      <Button
                        variant={"ghost"}
                        onClick={() => deleteLeave(leave.id)}
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
