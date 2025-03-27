"use client";

import React from "react";
import { leaveRequestsProps } from "../../../..";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LeaveBadge from "./leaveBadge";
import { LeaveRequestFilters } from "../shared/leaveFilter";
import UpdateLeave from "./updateLeave";
import { LeaveType } from "@/global/constent";
import CustomPagination from "../shared/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

const TableHeadings = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "leaveType", label: "Leave Type" },
  { key: "reason", label: "Reason" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "status", label: "Status" },
  { key: "requestedTo", label: "Requested To" },
  { key: "approvedBy", label: "Approved By" },
  { key: "actions", label: "Actions" },
];

const LeaveTable = ({ Leaves }: { Leaves: leaveRequestsProps }) => {
  const { data, pagination } = Leaves;

  const router = useRouter();
  const searchParams = useSearchParams();

  const col = searchParams.get("col") || "name";
  const sort = searchParams.get("sort") || "asc";

  const handleSort = (columnKey: string) => {
    const newSort = col === columnKey && sort === "asc" ? "desc" : "asc";

    const params = new URLSearchParams(searchParams.toString());
    params.set("col", columnKey);
    params.set("sort", newSort);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="overflow-x-auto">
      <LeaveRequestFilters />
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {TableHeadings.map(({ key, label }) => (
              <TableHead key={key} onClick={() => handleSort(key)}>
                <div className="flex gap-1 cursor-pointer">
                  {label}
                  {col === key && (
                    <ArrowUpDown
                      size={16}
                      className={`transition-transform ${
                        sort === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.user.name}</TableCell>
              <TableCell>{leave.user.email}</TableCell>
              <TableCell>{leave.leaveType as LeaveType}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                {" "}
                {new Date(leave.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {" "}
                {new Date(leave.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <LeaveBadge status={leave.status} />
              </TableCell>
              <TableCell>{leave.requestedTo.name}</TableCell>
              <TableCell>{leave.approvedBy?.name || "N/A"}</TableCell>
              <TableCell>
                <UpdateLeave leaveData={leave} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination pagination={pagination} />
    </div>
  );
};

export default LeaveTable;
