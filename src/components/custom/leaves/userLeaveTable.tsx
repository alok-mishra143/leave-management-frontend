"use client";

import { LeaveStatus, LeaveType } from "@/global/constent";
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
import { ArrowUpDown } from "lucide-react";
import LeaveBadge from "../request-leaves/leaveBadge";
import CustomPagination from "../shared/Pagination";
import { LeaveRequestFilters } from "../shared/leaveFilter";
import ApplyLeave from "./applyLeave";

interface LeaveRequestProps {
  id: string;
  requestedTo: { name: string };
  approvedBy?: { name: string } | null;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  leaveType: LeaveType;
  reason: string;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UserLeaveTableProps {
  data: LeaveRequestProps[];
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
          {data.map((leave) => (
            <TableRow key={leave.id}>
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
                  <button className="text-blue-500 hover:underline">
                    Cancel
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination pagination={pagination} />
    </div>
  );
};

export default UserLeaveTable;
